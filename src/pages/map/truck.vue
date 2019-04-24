<template>
  <div>
    <cool-link-header :searchable="false" :full="true"/>
    <div class="map">
      <map-hang class="map--hang">
        <template slot="search">
          <truck-search :params="params" @search="onSearch"></truck-search>
        </template>
        <template slot="result">
          <cool-link-loading v-if="loading"></cool-link-loading>
          <truck-result v-else></truck-result>
        </template>
      </map-hang>
      <truck-map class="map--scene"/>
    </div>
  </div>
</template>

<script>
import MapHang from '@components/map/hang.vue'
import TruckMap from '@components/map/truck/map.vue'
import TruckSearch from '@components/map/truck/search.vue'
import TruckResult from '@components/map/truck/result.vue'

import { sleep } from '@utils'

export default {
  name: 'Map',
  components: {
    MapHang,
    TruckMap,
    TruckSearch,
    TruckResult
  },
  data() {
    return {
      loading: false,
      list: [],
      params: {}
    }
  },
  methods: {
    onSearch() {
      this.fetch()
    },

    async fetch() {
      this.loading = true
      // TODO 读取数据 / 渲染
      await sleep(3000)
      this.loading = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.map {
  position: relative;
  height: calc(100vh - var(--siteHeaderHeight));
  overflow: hidden;
}

.map--scene {
  width: 100%;
  height: 100%;
}
</style>


