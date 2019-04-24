<template>
  <div class="map" ref="map">
    <baidu-map
      class="map-container"
      :scroll-wheel-zoom="false"
      :double-click-zoom="false"
      :map-click="true"
      :ak="ak"
      :center="center"
      :zoom="zoom"
      @ready="onReady"
    >
      <bm-marker
        animation="BMAP_ANIMATION_BOUNCE"
        :icon="{
          url: require('@/assets/img/pos.png'),
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
        }"
        :position="center"
        :dragging="false"
        :clicking="true"
      ></bm-marker>
    </baidu-map>
  </div>
</template>
<script>
import config from '@/config'
import mapMixin from '@/mixins/map'

import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'

import { isNull } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'Map',

  mixins: [mapMixin],

  components: {
    BmMarker
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      center: {},
      zoom: 14
    }
  },

  computed: {
    ...mapGetters({
      cityArea: 'getCityArea'
    })
  },

  methods: {
    init() {
      let { longitude: lng, latitude: lat } = this.data
      if (isNull(lng) || isNull(lat)) {
        this.center = this.cityArea
      } else {
        this.center = { lng, lat }
      }
      this.setScrollY()
    },

    setScrollY() {
      let { isGoMap } = this.$route.params
      if (isGoMap) {
        let elem = this.$refs.map
        let rect = elem.getBoundingClientRect()
        let scrollY = rect.top + window.scrollY - 140
        window.scrollTo(0, scrollY)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
@import 'depot.postcss';
.map-container {
  height: 500px;
}
</style>

