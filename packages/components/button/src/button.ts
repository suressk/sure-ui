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
    type: Object,
    default: () => ({})
  },
  type: {
    type: String,
    values: buttonTypes,
    default: ''
  },
  loading: Boolean,
  disabled: Boolean
}
