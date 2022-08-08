import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
const { resolve } = require('path')

const styleResourcesLoader = () => {
  return {
    preProcessor: 'scss',
    patterns: [
      resolve(__dirname, 'src/styles/_variables.scss'),
      resolve(__dirname, 'src/styles/_mixins.scss')
    ]
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueSetupExtend(), styleResourcesLoader()],
  server:{
    host: '0.0.0.0',
    port: 3333,
    open: true,
    hmr: {
      overlay: false
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "./src/styles/_variables.scss";',
      },
    },
  }
})