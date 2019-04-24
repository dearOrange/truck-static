import config from '@/config'

import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

export default {
  components: {
    BaiduMap
  },

  data() {
    return {
      ak: config.baiduMapAK,
      map: null,
      BMap: null,
      zoom: 15
    }
  },

  methods: {
    onReady({ map, BMap }) {
      this.map = map
      this.BMap = BMap
      this.init()
    },

    init() {}
  }
}
