import { ref } from 'vue'
import { defineStore } from "pinia"
import { loginAPI, mergeCartAPI } from '@/api'
import { useCartStore } from './cartStore'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref({})
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.data.result
    
    // 合并购物车
    await mergeCartAPI(cartStore.cartList.map(item =>{
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewCartList() // 更新购物车列表
  }

  // 退出清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    cartStore.clearCart() // 清除购物车
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