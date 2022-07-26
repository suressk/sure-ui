import { withInstall } from '@sure-ui/utils'
import Icon from './src/icon.vue'

const SureIcon = withInstall(Icon)

SureIcon.name = SureIcon.__name = 'SureIcon'

export {
  SureIcon
}
// export default SureIcon

export * from './src/icon'

