import Vue from 'vue'
import ElementUI from 'element-ui'
import { createRouter } from './router'
import { createStore } from './store'
import App from './App.vue'

if (process.browser) {
  window.global = window
}

if (process.browser) {
  require('@/themes/index.css')
}

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.bus = new Vue()

if (process.browser) {
  require('swiper/dist/css/swiper.css')
  import(/* webpackChunkName: "swiper" */ 'vue-awesome-swiper/dist/ssr').then(
    ({ default: VueAwesomeSwiper }) => {
      Vue.use(VueAwesomeSwiper)
    }
  )
}

import(/* webpackChunkName: "validate" */ '@/rules')
require('@/plugins')
require('@components/common')
require('@/directives')

export function createApp() {
  const router = createRouter()

  let app = new Vue({
    router,
    store: createStore(),
    render: h => h(App)
  })

  return { app, router }
}
