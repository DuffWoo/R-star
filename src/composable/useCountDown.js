// 倒计时函数
import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  let timer = null
  const time = ref(0)

  // 格式化时间
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))

  // 倒计时
  const start = (currentTime) => {
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }

  // 清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return { 
    start,
    formatTime
  }
}