// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Plugins
import { lazyPlugin } from '@/directive' // 图片懒加载插件
import { componentsPlugin } from '@/components'

import '@/styles/common.scss' // 初始化样式文件

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentsPlugin)

app.mount('#app')
