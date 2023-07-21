import httpInstance from "@/utils/http"

/**
 * 获取导航分类列表
 * @returns 
 */
export function getCategoryAPI() {
  return httpInstance({
    url: '/home/category/head'
  })
}