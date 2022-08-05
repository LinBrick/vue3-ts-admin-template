import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
  server:{
    host: '0.0.0.0',
    port: 3333,
    open: true
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src')
    }
  },
})