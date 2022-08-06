import { PKG_NAME, PKG_PREFIX } from '@sure-ui/build-constants'

import type { Plugin } from 'rollup'

export function SureAlias(): Plugin {
  const themeChalk = 'theme-chalk'
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const

  return {
    name: 'sure-ui-alias-plugin',
    resolveId(id) {
      if (!id.startsWith(sourceThemeChalk)) {
        return
      }
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute'
      }
    }
  }
}
