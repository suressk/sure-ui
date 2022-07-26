import { createApp } from 'vue'

import { SureIcon } from '@sure-ui/components'
import App from './src/App.vue'
import '@sure-ui/theme-chalk/src/index.scss'

// console.log('import.meta: ', import.meta)

createApp(App).use(SureIcon).mount('#play')
