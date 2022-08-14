// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    SureIcon: typeof import('../packages/sure-ui')['SureIcon']
  }

  // interface ComponentCustomProperties {
  //   $message: typeof import('../packages/sure-ui')['SureMessage']
  //   $notify: typeof import('../packages/sure-ui')['SureNotification']
  //   $msgbox: typeof import('../packages/sure-ui')['SureMessageBox']
  //   $messageBox: typeof import('../packages/sure-ui')['SureMessageBox']
  //   $alert: typeof import('../packages/sure-ui')['SureMessageBox']['alert']
  //   $confirm: typeof import('../packages/sure-ui')['SureMessageBox']['confirm']
  //   $prompt: typeof import('../packages/sure-ui')['SureMessageBox']['prompt']
  //   $loading: typeof import('../packages/sure-ui')['SureLoadingService']
  // }
}

export {}
