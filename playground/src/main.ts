import { createApp } from 'vue'

import { SureButton, SureIcon } from '@sure-ui/components'
import App from './App.vue'
import '@sure-ui/theme-chalk/src/index.scss'

// console.log('import.meta: ', import.meta)
createApp(App).use(SureIcon).use(SureButton).mount('#play')
