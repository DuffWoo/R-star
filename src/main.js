// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// Plugins
import { lazyPlugin } from '@/directive' // 图片懒加载插件
import { componentsPlugin } from '@/components'

import '@/styles/common.scss' // 初始化样式文件

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)
app.use(lazyPlugin)
app.use(componentsPlugin)

app.mount('#app')
