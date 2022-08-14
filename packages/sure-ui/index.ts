import installer from './defaults'
export * from '@sure-ui/components'
export * from '@sure-ui/constants'
export * from '@sure-ui/directives'
export * from '@sure-ui/hooks'
// export * from '@sure-ui/tokens'
export * from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer

export { default as dayjs } from 'dayjs'
