import { createI18n } from 'vue-i18n'
import { getLanguage } from '@/utils/cookies'

// element-ui built-in lang
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementEsLocale from 'element-ui/lib/locale/lang/es'
import elementJaLocale from 'element-ui/lib/locale/lang/ja'
import elementKoLocale from 'element-ui/lib/locale/lang/ko'
import elementItLocale from 'element-ui/lib/locale/lang/it'

// User defined lang
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'
import jaLocale from './ja'
import koLocale from './ko'
import itLocale from './it'

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  es: {
    ...esLocale,
    ...elementEsLocale
  },
  ja: {
    ...jaLocale,
    ...elementJaLocale
  },
  ko: {
    ...koLocale,
    ...elementKoLocale
  },
  it: {
    ...itLocale,
    ...elementItLocale
  }
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    document.documentElement.lang = cookieLanguage
    return cookieLanguage
  }

  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      document.documentElement.lang = locale
      return locale
    }
  }

  // Default language is english
  return 'en'
}

export const i18n = createI18n({
  legacy: false, // 让 setup 函数可以通过 t 访问
  globalInjection: true, // 让 template 可以像 vue2 那样使用 $t 来访问
  locale: 'zh', // 默认语言为中文
  fallbackLocale: 'zh', // 没有其他语言的情况下默认中文
  messages
})

export default i18n
