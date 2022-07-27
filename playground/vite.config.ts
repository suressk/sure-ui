import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

// it didn't work!
// import DefineOptions from 'unplugin-vue-define-options/vite'

export default defineConfig({
  plugins: [
    Vue()
    // DefineOptions()
  ]
})
