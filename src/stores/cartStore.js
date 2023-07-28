import { ref, computed } from 'vue'
import { defineStore } from "pinia"
import { InsertCartAPI, getNewCartListAPI, delCartAPI } from '@/api'
import { useUserStore } from './userStore'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  // state
  const cartList = ref([])

  // action
  // 获取最新购物车列表
  const updateNewCartList = async () => {
    const res = await getNewCartListAPI()
    cartList.value = res.data.result
  }

  // 添加到购物车
  const addCart = async (goods) => {
    // console.log('Add', goods)
    if (isLogin.value) { // 接口
      const { skuId, count } = goods
      await InsertCartAPI({ skuId, count })
      updateNewCartList()
    } else { // 本地
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }
  }

  // delete
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartAPI([skuId])
      updateNewCartList()
    } else {
      const index = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(index, 1)
    }
  }

  // 清空购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  // 全选功能
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  // 商品数量
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))

  // 商品总价
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 已选数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 已选总价
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  return {
    cartList,
    allCount,
    allPrice,
    selectedCount,
    selectedPrice,
    isAll,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    clearCart,
    updateNewCartList
  }
}, {
  persist: true // 持久化
})