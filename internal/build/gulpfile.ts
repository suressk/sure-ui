import { join, resolve } from 'path'
import { copyFile, mkdir } from 'fs/promises'
import { copy } from 'fs-extra'
import {
  buildOutput,
  projectRoot,
  sureOutput,
  surePackage
} from '@sure-ui/build-utils'
import { parallel, series } from 'gulp'
import type { TaskFunction } from 'gulp'
import { buildConfig, run, runTask, withTaskName } from './src'
import type { Module } from './src'

/**
 * Copy files: `package.json`, `README.md`, `global.d.ts`
 */
export const copyFiles = async () => {
  Promise.all([
    copyFile(surePackage, join(sureOutput, 'package.json')),
    copyFile(
      resolve(projectRoot, 'README.md'),
      resolve(sureOutput, 'README.md')
    ),
    copyFile(
      resolve(projectRoot, 'global.d.ts'),
      resolve(sureOutput, 'global.d.ts')
    )
  ])
}

/**
 *
 * @param done
 * @returns
 */
export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = resolve(buildOutput, 'types', 'packages')
  const copyTypes = (module: Module) =>
    withTaskName(
      `copyTypes:${module}`,
      () => copy(src, buildConfig[module].output.path, { recursive: true })
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

export const copyFullStyle = async () => {
  await mkdir(resolve(sureOutput, 'dist'), { recursive: true })
  await copyFile(
    resolve(sureOutput, 'theme-chalk/index.css'),
    resolve(sureOutput, 'dist/index.css')
  )
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(sureOutput, { recursive: true })),
  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions'),
    runTask('buildHelper'),
    series(
      withTaskName('buildThemeChalk', async () => {
        await run('pnpm run -C packages/theme-chalk build')
      }),
      copyFullStyle
    )
  ),
  parallel(copyTypesDefinitions, copyFiles)
)

export * from './src'
