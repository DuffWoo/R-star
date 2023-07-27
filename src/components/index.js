import RsImageView from './ImageView/index.vue'
import RsSku from './RsSku/index.vue'

// 全局注册组件
export const componentsPlugin = {
  install (app) {
    app.component('RsImageView', RsImageView)
    app.component('RsSku', RsSku)
  }
}