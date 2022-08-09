import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const { resolve } = require('path')


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vueSetupExtend(), 
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
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
        additionalData: '@import "./src/styles/_variables.scss"; @import "./src/styles/_mixins.scss";',
      },
    },
  }
})