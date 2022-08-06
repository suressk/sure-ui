import process from 'process'
import path from 'path'
import fs from 'fs/promises'
import consola from 'consola'
import * as vueCompiler from 'vue/compiler-sfc'
import glob from 'fast-glob'
import chalk from 'chalk'
import { Project } from 'ts-morph'
import {
  buildOutput,
  excludeFiles,
  pkgRoot,
  projectRoot,
  sureRoot
} from '@sure-ui/build-utils'
import type { CompilerOptions, SourceFile } from 'ts-morph'
import { pathRewriter } from '../utils'
import typeUnsafeStricter from '../type-unsafe-stricter.json'

const TSCONFIG_PATH = path.resolve(projectRoot, 'tsconfig.web.json')
const outDir = path.resolve(buildOutput, 'types')

/**
 * fork = require( https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
export const generateTypesDefinitions = async () => {
  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true,
    outDir,
    baseUrl: projectRoot,
    preserveSymlinks: true,
    skipLibCheck: true,
    noImplicitAny: false
  }
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true
  })

  const sourceFiles = await addSourceFiles(project)
  consola.success('Added source files')

  typeCheck(project, typeUnsafeStricter)
  consola.success('Stricter type check passed!')

  await project.emit({
    emitOnlyDtsFiles: true
  })

  const tasks = sourceFiles.map(async (sourceFile) => {
    const relativePath = path.relative(pkgRoot, sourceFile.getFilePath())
    consola.trace(
      chalk.yellow(
        `Generating definition for file: ${chalk.bold(relativePath)}`
      )
    )

    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()
    if (emitFiles.length === 0) {
      throw new Error(`Emit no file: ${chalk.bold(relativePath)}`)
    }

    const subTasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath()
      await fs.mkdir(path.dirname(filepath), {
        recursive: true
      })

      await fs.writeFile(
        filepath,
        pathRewriter('esm')(outputFile.getText()),
        'utf8'
      )

      consola.success(
        chalk.green(
          `Definition for file: ${chalk.bold(relativePath)} generated`
        )
      )
    })

    await Promise.all(subTasks)
  })

  await Promise.all(tasks)
}

async function addSourceFiles(project: Project) {
  project.addSourceFileAtPath(path.resolve(projectRoot, 'typings/env.d.ts'))

  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'
  const filePaths = excludeFiles(
    await glob([globSourceFile, '!sure-ui/**/*'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )
  const epPaths = excludeFiles(
    await glob(globSourceFile, {
      cwd: sureRoot,
      onlyFiles: true
    })
  )

  const sourceFiles: SourceFile[] = []
  await Promise.all([
    ...filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await fs.readFile(file, 'utf-8')
        const sfc = vueCompiler.parse(content)
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content = script?.content ?? ''

          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx'
            })
            content += compiled.content
          }

          const lang = scriptSetup?.lang || script?.lang || 'js'
          const sourceFile = project.createSourceFile(
            `${path.relative(process.cwd(), file)}.${lang}`,
            content
          )
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
    ...epPaths.map(async (file) => {
      const content = await fs.readFile(path.resolve(sureRoot, file), 'utf-8')
      sourceFiles.push(
        project.createSourceFile(path.resolve(pkgRoot, file), content)
      )
    })
  ])

  return sourceFiles
}

function typeCheck(project: Project, paths: string[]) {
  // Type unsafe list. The TS errors are not all fixed yet, so we need a list of which files are not fixed with TS errors to prevent accidental TS errors.
  const typeUnsafePaths = paths.map((_path) => {
    let paths = path.resolve(projectRoot, _path)
    if (_path.endsWith('/')) { paths += path.sep }
    return paths
  })

  const diagnostics = project.getPreEmitDiagnostics().filter((diagnostic) => {
    const filePath = diagnostic.getSourceFile()!.getFilePath()!
    if (!filePath) {
      return false
    }
    const file = path.normalize(filePath)
    return !typeUnsafePaths.some(safePath => file.startsWith(safePath))
  })

  if (diagnostics.length > 0) {
    consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
    const err = new Error('Failed to generate dts.')
    consola.error(err)
    throw err
  }
}
