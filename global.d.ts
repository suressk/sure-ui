// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SureIcon: typeof import('sure-ui')['SureIcon']
  }

  // interface ComponentCustomProperties {
  //   $message: typeof import('sure-ui')['SureMessage']
  //   $notify: typeof import('sure-ui')['SureNotification']
  //   $msgbox: typeof import('sure-ui')['SureMessageBox']
  //   $messageBox: typeof import('sure-ui')['SureMessageBox']
  //   $alert: typeof import('sure-ui')['SureMessageBox']['alert']
  //   $confirm: typeof import('sure-ui')['SureMessageBox']['confirm']
  //   $prompt: typeof import('sure-ui')['SureMessageBox']['prompt']
  //   $loading: typeof import('sure-ui')['SureLoadingService']
  // }
}

export {}
