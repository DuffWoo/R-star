import httpInstance from "@/utils/http"

/**
 * 获取 面包屑分类
 * @param {*} id 
 * @returns 
 */
export const getBreadCategoryAPI = (id) => {
  return httpInstance({
    url: '/category',
    params: {
      id
    }
  })
}

/**
 * 面包屑 二级分类列表
 * @param {*} id 
 * @returns 
 */
export const getCategoryFilterAPI = (id) => {
  return httpInstance({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}

/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
   export const getSubCategoryAPI = (data) => {
    return httpInstance({
      url: '/category/goods/temporary',
      method: 'POST',
      data
    })
  }