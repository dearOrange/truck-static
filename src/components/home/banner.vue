<template>
  <div class="banner">
    <div class="banner--box">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in list" :key="index">
            <img height="640" width="100%" :src="item.img" alt>
          </div>
        </div>
      </div>
      <div class="banner--preview--pagination"></div>
      <div class="swiper-button-prev swiper-button-white swiper--button--prev--box"></div>
      <div class="swiper-button-next swiper-button-white swiper--button--next--box"></div>
    </div>
    <div class="banner--cover">
      <home-slogan :sub="slogan.sub" :sup="slogan.sup" class="banner--slogan"></home-slogan>
      <slot></slot>
    </div>
  </div>
</template>

<script>

import HomeSlogan from '@components/home/slogan.vue'

export default {
  name: 'HomeBanner',
  components: {
    HomeSlogan
  },

  props: {},

  data() {
    let self = this
    return {
      slogan: {},
      list: [
        {
          img: require('@/assets/img/banner1.jpg'),
          sub: '找冷库  运冷货  就上1号冷链',
          sup: '10000＋冷库资源信息 • 快速匹配双向需求'
        },
        {
          img: require('@/assets/img/banner2.jpg'),
          sub: '五大商协会联合权威认证',
          sup:
            '全国工商联水产业商会 • 中国仓储与配送协会 • 中国畜牧业协会 • 中国果品流通协会 • 中国蔬菜流通协会'
        }
      ],
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 6000
        },
        pagination: {
          clickable: true,
          el: '.banner--preview--pagination',
          renderBullet(index, className) {
            return `<span class='${className} preview--pagination-item'></span>`
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChangeTransitionEnd() {
            let { sub, sup } = self.list[this.realIndex]
            self.slogan = {
              sub,
              sup
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="postcss">
.banner--box {
  position: relative;
}

.banner--preview--pagination {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  z-index: 99;
}
.banner--preview--pagination-item {
  width: 12px;
  height: 12px;
  margin: 0 8px;
  cursor: pointer;
}
.swiper-pagination-bullet-active {
  background: rgba(255, 255, 255, 1);
}
</style>
<style lang="postcss" scoped>
.banner {
  position: relative;
  &:hover {
    & .swiper-button-white {
      display: block;
    }
  }

  & .banner--cover {
    position: absolute;
    top: 150px;
    left: 50%;
    z-index: var(--zIndex6);
    width: var(--siteWidth);
    margin-left: calc(var(--siteWidth) / -2);
  }
}
:root {
  --banner-btn: {
    background-color: rgba(255, 255, 255, 0.26);
    background-size: 50%;
    outline: none;
  }
}
.swiper--button--prev--box {
  left: 40px;
  @apply --banner-btn;
}
.swiper--button--next--box {
  right: 40px;
  @apply --banner-btn;
}
.swiper-button-white {
  display: none;
}
</style>
