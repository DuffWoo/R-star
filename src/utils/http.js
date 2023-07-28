import router from '@/router'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}` // 拼接 token 数据
  }
  return config
}, error => Promise.reject(error))

// 响应拦截器
httpInstance.interceptors.response.use(response => {
  return response
}, error => {
  const userStore = useUserStore()
  // 统一错误提示
  ElMessage({ 
    type: 'warning',
    message: error.response.data.message
  })
  // 401 token 失效处理
  if(error.response.status === 401) {
    userStore.clearUserInfo() // 清除 token
    router.push('/login') // 跳回登录页
  }
  return Promise.reject(error)
})

export default httpInstance