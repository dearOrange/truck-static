<template>
  <baidu-map class="map-container" :ak="ak" :center="center" :zoom="15" @ready="onReady"></baidu-map>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

import config from '@/config'

export default {
  name: 'Map',
  components: {
    BaiduMap
  },

  data() {
    return {
      ak: config.baiduMapAK,
      center: { lng: 116.404, lat: 39.915 },
      points: []
    }
  },
  methods: {
    onReady({ map, BMap }) {
      this.map = map
      this.BMap = BMap
    }
  }
}
</script>

<style lang="less" scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
