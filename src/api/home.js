import httpInstance from "@/utils/http"

/**
 * 获取 banner
 * @returns 
 */
export function getBannerAPI () {
  return httpInstance({
    url: '/home/banner'
  })
}

/**
 * 获取 新鲜好物
 * @returns 
 */
export const getNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}

/**
 * 获取 人气推荐
 * @returns 
 */
export const getHotAPI = () => {
  return httpInstance({
    url: '/home/hot'
  })
}

export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}