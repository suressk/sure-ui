import { Loading } from 'sure-icons-vue'
import { iconPropType } from '@sure-ui/utils'

export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  'text',
  ''
] as const

export const buttonProps = {
  size: {
    type: String
  },
  type: {
    type: String,
    values: buttonTypes,
    default: ''
  },
  loading: Boolean,
  loadingIcon: {
    type: iconPropType,
    default: () => Loading
  },
  icon: {
    type: iconPropType,
    default: ''
  },
  disabled: Boolean
}

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}
