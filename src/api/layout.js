import httpInstance from "@/utils/http"

// 获取导航列表
export function getCategoryAPI() {
  return httpInstance({
    url: '/home/category/head'
  })
}