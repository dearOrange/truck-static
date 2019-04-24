<template>
  <bm-marker
    :icon="point.icon"
    :position="point.position"
    :dragging="false"
    @click="onClickMarker"
    :clicking="true"
  >
    <bm-info-window
      :position="point.position"
      :offset="{height: -20, width: 10}"
      :show="shown"
      @open="onInfoWindowOpen"
      @close="onInfoWindowClose"
    >
      <div class="map-point-content">
        <div class="lt">
          <img :src="point.depot.ptStockPublish.photoUrls" alt="图片">
        </div>
        <div class="rt">
          <p
            class="price"
          >{{point.depot.expectedPriceType === 'N' ? '面议': point.depot.ptStockPriceList[0].price}}{{point.depot.expectedPriceType === 'N' ? '' : point.depot.ptStockPriceList[0].stockPriceUnitName}}</p>
          <p class="title">{{point.depot.ptStockPublish.publishTitle}}</p>
          <p class="type">
            <span
              v-for="(item, index) in point.depot.baStockDetailList"
              :key="index"
            >{{item.emptyArea}} ㎡ | {{item.stockTypeNames}}</span>
          </p>
        </div>
      </div>
    </bm-info-window>
  </bm-marker>
</template>

<script>
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'MapPoint',
  components: {
    BmMarker,
    BmInfoWindow
  },
  props: {
    point: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      shown: false
    }
  },

  computed: {
    ...mapGetters({
      currentId: 'getDepotId'
    })
  },

  watch: {
    currentId(newId, oldId) {
      if (newId !== oldId) {
        this.shown =
          this.currentId === this.point.depot.ptStockPublish.stockPublishUkid
      }
    }
  },

  methods: {
    onClickMarker() {
      this.shown = !this.shown
    },
    onInfoWindowOpen() {
      this.shown = true
    },
    onInfoWindowClose() {
      this.shown = false
    }
  },

  mounted() {}
}
</script>

<style lang="postcss" scoped>
.map-point-content {
  display: flex;
  justify-content: space-between;
  width: 350px;
  height: 100%;

  & > .lt {
    width: 140px;
    height: 100px;
    margin-right: 15px;
    & > img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  & > .rt {
    flex: 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    & > p {
      width: 100%;
      &.price {
        font-size: 18px;
      }
      &.type {
        color: var(--siteTextLightColor);
        & > span {
          margin-left: 4px;
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>

