import { Loading } from 'sure-icons-vue'
import type { Component, PropType } from 'vue'

export const definePropType = <T>(val: any): PropType<T> => val

export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function
])

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
