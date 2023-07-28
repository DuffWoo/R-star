import { ref } from 'vue'
import { defineStore } from "pinia"
import { loginAPI } from '@/api'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.data.result
  }
  const clearUserInfo = () => {
    userInfo.value = {}
  }
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},
{
  persist: true // 持久化，存储到 localstorage
}
)