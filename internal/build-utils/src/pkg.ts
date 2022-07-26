import findWorkspacePackages from '@pnpm/find-workspace-packages'
// import type { ProjectManifest } from '@pnpm/types'
import consola from 'consola'
import colors from 'picocolors'
import { projectRoot } from './paths'

export const getWorkspacePackages = () => findWorkspacePackages(projectRoot)
export const getWorkspaceNames = async (dir = projectRoot) => {
  consola.info(colors.bgCyan('[getWorkspaceNames]'), dir)
  const pkgs = await findWorkspacePackages(projectRoot)
  return pkgs
    .filter((pkg: any) => pkg.dir.startsWith(dir))
    .map((pkg: any) => pkg.manifest.name)
    .filter((name: any): name is string => !!name)
}

export const getPackageManifest = (pkgPath: string) => {
  // try {
  //   const pkgManifest = fs.readFileSync(pkgPath, {
  //     encoding: 'utf-8'
  //   })
  //   /* use `ProjectManifest` type, it will be error when running build command */
  //   return JSON.parse(pkgManifest) as ProjectManifest || {}
  // } catch (error) {
  //   return {}
  // }
  // // eslint-disable-next-line @typescript-eslint/no-var-requires
  // return require(pkgPath) as ProjectManifest
  return require(pkgPath)
}

/**
 * Get package.json file's dependencies
 * @param pkgPath
 * @returns
 */
export const getPackageDependencies = (
  pkgPath: string
): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  }
}

/**
 * Exclude files, such as `node_modules`, `test`, `dist` and so on...
 * @param files
 * @returns
 */
export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter(
    (path: string) => !excludes.some((exclude: string) => path.includes(exclude))
  )
}
