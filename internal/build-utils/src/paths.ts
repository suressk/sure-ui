import { resolve } from 'path'

export const projectRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projectRoot, 'packages')
export const componentsRoot = resolve(pkgRoot, 'components')
export const themeRoot = resolve(pkgRoot, 'theme-chalk')
export const hooksRoot = resolve(pkgRoot, 'hooks')
export const localeRoot = resolve(pkgRoot, 'locale')
export const directivesRoot = resolve(pkgRoot, 'directives')
export const sureRoot = resolve(pkgRoot, 'sure-ui')
export const utilsRoot = resolve(pkgRoot, 'utils')
export const buildRoot = resolve(projectRoot, 'internal', 'build')

// Docs
export const docsDirName = 'docs'
export const docsRoot = resolve(projectRoot, docsDirName)
export const vitepressRoot = resolve(docsRoot, '.vitepress')

/* `/dist` */
export const buildOutput = resolve(projectRoot, 'dist')
/** `/dist/sure-ui` */
export const sureOutput = resolve(buildOutput, 'sure-ui')

/* package.json */
export const projectPackage = resolve(projectRoot, 'package.json')
export const componentsPackage = resolve(componentsRoot, 'package.json')
export const themePackage = resolve(themeRoot, 'package.json')
export const hooksPackage = resolve(hooksRoot, 'package.json')
export const localePackage = resolve(localeRoot, 'package.json')
export const directivesPackage = resolve(directivesRoot, 'package.json')
export const surePackage = resolve(sureRoot, 'package.json')
export const utilsPackage = resolve(utilsRoot, 'package.json')
export const docsPackage = resolve(docsRoot, 'package.json')
