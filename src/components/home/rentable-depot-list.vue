<template>
  <cool-link-async-loader :loader="fetch">
    <template slot-scope="list">
      <div class="rentable-depots">
        <div
          v-swiper:mySwiper="{
          loop: true,
          autoplay: {
            delay: 6000
          },
          initialSlide: 0,
          loopAdditionalSlides: list.length,
          slidesPerView :5,
          slidesPerGroup: 1,
          effect : 'coverflow',
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 60,
            modifier: 1,
            slideShadows : false
            },
          }"
          ref="rentableSwiper"
          style="height: 400px;"
          @click="slideClicked(list)"
        >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in list" :key="index">
              <div class="depot-item">
                <home-depot-rent-info class="depot-item--content" :data="item"></home-depot-rent-info>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </cool-link-async-loader>
</template>

<script>
import HomeDepotRentInfo from '@components/home/depot-rent-info.vue'

import rentApi from '@/api/rent'

export default {
  name: 'RentableDepots',
  components: {
    HomeDepotRentInfo
  },

  data() {
    return {
      containerWidth: 0,
      itemWidth: 260
    }
  },
  computed: {
    swiper() {
      return this.$refs.rentableSwiper.swiper
    }
  },
  methods: {
    slideClicked(list) {
      console.log(list)
      let len
      let index
      let tagartData
      if (list) {
        len = list.length
        let clickedIndex = this.swiper.clickedIndex

        if (clickedIndex) {
          index = clickedIndex % len
          tagartData = list[index]
          this.$router.push(`/rent/${tagartData.stockDemandUkid}`)
        }
      }
    },
    fetch() {
      return rentApi.getPopularList(10, '')
    }
  }
}
</script>

<style lang="postcss" scoped>
.depot-item {
  position: relative;
  height: 350px;
  width: 300px;
  transform: translateX(-35px);
}
</style>

