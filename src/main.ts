import { DirectiveOptions } from 'vue'

import 'normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { i18n } from '@/lang'
import store from '@/store'
import svgIcon from "@/components/SvgIcon/index.vue"
import { AppModule } from '@/store/modules/app'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
})

app.component('SvgIcon', svgIcon)

app.use(i18n)

// app.use(SvgIcon, {
//   tagName: 'svg-icon',
//   defaultWidth: '1em',
//   defaultHeight: '1em'
// })

// Register global directives
// Object.keys(directives).forEach(key => {
//   app.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
// })

// Register global filter functions
// Object.keys(filters).forEach(key => {
//   app.filter(key, (filters as { [key: string ]: Function })[key])
// })

app.config.productionTip = false

app.use(router)
app.use(store)
app.mount('#app')