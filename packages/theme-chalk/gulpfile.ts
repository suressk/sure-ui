import path from 'path'
import colors from 'picocolors'
import { dest, parallel, series, src } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import consola from 'consola'
import { sureOutput } from '@sure-ui/build-utils'

const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(sureOutput, 'theme-chalk')

// const startBuildTipTask = async () => {
//   consola.info(colors.bgCyan('[sure-ui] Build theme-chalk start!'))
// }

/**
 * compile theme-chalk scss & minify
 * not use sass.sync().on('error', sass.logError) to throw exception
 * @returns
 */
const buildThemeChalk = () => {
  const sass = gulpSass(dartSass)
  const noPrefixFile = /(index|base|display)/
  return src(path.resolve(__dirname, 'src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(
          `${colors.cyan(details.name)}: ${colors.yellow(
            details.stats.originalSize / 1000
          )} KB -> ${colors.green(details.stats.minifiedSize / 1000)} KB`
        )
      })
    )
    .pipe(
      rename((path) => {
        if (!noPrefixFile.test(path.basename)) {
          path.basename = `sure-${path.basename}`
        }
      })
    )
    .pipe(dest(distFolder))
}

/**
 * Build dark Css Vars
 * @returns
 */
// const buildDarkCssVars = () => {
//   const sass = gulpSass(dartSass)
//   return src(path.resolve(__dirname, 'src/dark/css-vars.scss'))
//     .pipe(sass.sync())
//     .pipe(autoprefixer({ cascade: false }))
//     .pipe(
//       cleanCSS({}, (details) => {
//         consola.success(
//           `${colors.cyan(details.name)}: ${colors.yellow(
//             details.stats.originalSize / 1000
//           )} KB -> ${colors.green(details.stats.minifiedSize / 1000)} KB`
//         )
//       })
//     )
//     .pipe(dest(`${distFolder}/dark`))
// }

/**
 * copy from packages/theme-chalk/dist to dist/sure-ui/theme-chalk
 */
export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

/**
 * copy source file to packages
 */
export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, 'src/**')).pipe(
    dest(path.resolve(distBundle, 'src'))
  )
}

export const build = parallel(
  copyThemeChalkSource,
  series(
    buildThemeChalk
    // buildDarkCssVars,
    // copyThemeChalkBundle
  )
)

export default build
