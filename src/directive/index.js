import { useIntersectionObserver } from '@vueuse/core'

// 定义全局指令
export const lazyPlugin = {
  install (app) {
    // 懒加载
    app.directive('img-lazy', {
      mounted (el, binding) {
        // el：指令绑定元素 img
        // binding: binding.value 绑定指令表达式的值 url
        // console.log(el, binding.value)
        useIntersectionObserver( // 图片是否进入视口区域
          el,
          ([{ isIntersecting }]) => {
            // console.log(isIntersecting)
            if (isIntersecting) {
              el.src = binding.value
            }
          },
        )
      }
    })
  }
}