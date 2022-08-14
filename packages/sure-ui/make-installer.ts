import { INSTALLED_KEY } from '@sure-ui/constants'
import type { App, Plugin } from '@vue/runtime-core'
import { version } from './version'

// interface SureApp extends App {
//   [INSTALLED_KEY]: boolean
// }

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    if (app[INSTALLED_KEY]) {
      return
    }
    app[INSTALLED_KEY] = true
    components.forEach(c => app.use(c))
  }
  return {
    version,
    install
  }
}
