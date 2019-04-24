<template>
  <cool-link-async-loader :loader="fetch">
    <template slot-scope="list">
      <div class="hot-depots">
        <div v-swiper:mySwiper="{
          loop: false,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        }">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in list" :key="index">
              <div class="hot-depots--wrap">
              <cool-link-thumbnails
                :link="'/depot/' + data.ptStockPublish.stockPublishUkid"
                :width="350"
                :height="202"
                v-for="data in item"
                :key="data.baStockDetailList[0].stockDetailUkid"
                :srcImg="data.ptStockPublish.photoUrls"
              >
                <template slot="desc">
                  <home-hot-depot-desc :data="data"></home-hot-depot-desc>
                </template>
              </cool-link-thumbnails>
            </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev swiper-button-white hot-depots--prev-btn"></div>
        <div class="swiper-button-next swiper-button-white hot-depots--next-btn"></div>


      </div>
    </template>
  </cool-link-async-loader>
</template>

<script>
import { chunk } from 'lodash'
import HomeHotDepotDesc from '@components/home/hot-depot-desc.vue'
import pageApi from '@/api/homepage'

export default {
  name: 'HotDepot',

  components: {
    HomeHotDepotDesc
  },
  methods: {
    fetch() {
      return pageApi.stockPopular(9).then(({ success, data }) => {
        let rst
        if (success) {
          rst = chunk(data, 3)
        }
        return {
          success,
          data: rst
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.hot-depots {
  position: relative;
}
.hot-depots--wrap {
  display: flex;
  justify-content: space-between;
  padding: 0 0 20px;
}

:root {
  --hot-depots-btn: {
    background-color: rgba(57, 64, 67, 1);
    background-size: 50%;
  }
}

.hot-depots--prev-btn {
  left: -40px;
  @apply --hot-depots-btn;
}
.hot-depots--next-btn {
  right: -40px;
  @apply --hot-depots-btn;
}
</style>


