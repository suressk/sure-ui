import { withInstall } from '@sure-ui/utils'
import Icon from './src/icon.vue'

const SureIcon = withInstall(Icon)

// now, it need to be named by manual (default name is directory name `icon`)
// SureIcon.name = SureIcon.__name = 'SureIcon'

export {
  SureIcon
}
// export default SureIcon

export * from './src/icon'

