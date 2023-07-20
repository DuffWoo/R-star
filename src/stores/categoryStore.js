import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/api/layout'

// 获取导航列表
export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])

  const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.data.result
    // console.log(categoryList)
  }

  return { categoryList, getCategory }
})
