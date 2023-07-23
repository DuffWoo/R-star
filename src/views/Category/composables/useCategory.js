import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { getBreadCategoryAPI } from '@/api'

export const useCategory = () => {
  const route = useRoute()
  const categoryData = ref({})
  const getCategory = async (id = route.params.id) => {
    const res = await getBreadCategoryAPI(id)
    categoryData.value = res.data.result
    // console.log(categoryData)
  }
  
  onMounted(() => getCategory())

  // 路由发生变化时，数据重新发送
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}