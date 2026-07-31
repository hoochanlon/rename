import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

// 从 localStorage 读取用户偏好，默认中文
const getDefaultLocale = (): string => {
  const saved = localStorage.getItem('locale')
  if (saved && ['zh-CN', 'en-US'].includes(saved)) {
    return saved
  }
  // 自动检测浏览器语言
  const browserLang = navigator.language
  if (browserLang.startsWith('en')) {
    return 'en-US'
  }
  return 'zh-CN'
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export default i18n
