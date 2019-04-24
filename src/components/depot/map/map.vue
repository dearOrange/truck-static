<template>
  <baidu-map
    class="map-container"
    :scroll-wheel-zoom="true"
    :ak="ak"
    :center="center"
    :zoom="zoom"
    @ready="onReady"
  >
    <depot-map-point
      v-for="point in points"
      :key="point.depot.ptStockPublish.stockPublishUkid"
      :point="point"
    ></depot-map-point>
  </baidu-map>
</template>

<script>
import { isNull } from 'lodash'

import DepotMapPoint from './point.vue'
import config from '@/config'
import mapMixin from '@/mixins/map'
import { mapGetters } from 'vuex'

import { logger } from '@utils'
const log = logger.getLogger('depot')

let posIcon = require('@/assets/img/pos.png')

export default {
  name: 'Map',
  mixins: [mapMixin],
  components: {
    DepotMapPoint
  },

  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      zoom: 15
    }
  },

  computed: {
    ...mapGetters({
      depot: 'getDepot',
      cityArea: 'getCityArea'
    }),

    center() {
      let defaultCenter = this.cityArea
      if (isNull(this.depot)) {
        return defaultCenter
      } else {
        let { longitude: lng, latitude: lat } = this.depot
        if (isNull(lng) || isNull(lat)) {
          return defaultCenter
        }
        return {
          lng,
          lat
        }
      }
    },
    points() {
      let list = this.list
      return list.map((item, index) => {
        log.debug(
          `这是第[${index + 1}]个仓库位置信息 => [lng]: ${
            item.longitude
          } | [lat]: ${item.latitude} | [id]: ${
            item.ptStockPublish.stockPublishUkid
          }`
        )
        return {
          depot: item,
          position: {
            lng: item.longitude,
            lat: item.latitude
          },
          icon: {
            url: posIcon,
            size: {
              width: 60,
              height: 60
            },
            opts: {
              anchor: {
                width: 10,
                height: 25
              }
            }
          }
        }
      })
    }
  },

  methods: {
    init() {
      // console.log(this.BMap)
      // console.log(this.map)
      // console.log(this.map.getCenter())
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
