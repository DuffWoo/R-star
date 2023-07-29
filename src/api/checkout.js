import httpInstance from "@/utils/http"

/**
 * 获取订单详情
 * @returns 
 */
export const getCheckoutInfoAPI = () => {
  return httpInstance({
    url: '/member/order/pre'
  })
}

/**
 * 提交订单 - 生成订单
 * @param {*} data 
 * @returns 
 */
export const createOrderAPI = (data) => {
  return httpInstance({
    url: '/member/order',
    method: 'POST',
    data
  })
}