<template>
  <div class="thumb--con">
    <div class="thumb">
      <div
        ref="preview"
        class="thumb-preview"
        v-swiper:previewSwiper="{
          spaceBetween: 0,
          loop: true,
          loopedSlides: phoneSize,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in photos" :key="index">
            <img :src="item" alt>
          </div>
        </div>
        <img v-if="!imgSize" src="@/assets/img/default.jpg" style="margin:0 auto;" alt="图片">
        <div class="thunm-nav-btn swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="thunm-nav-btn swiper-button-prev swiper-button-white" slot="button-prev"></div>
      </div>
      <div
        class="thumb-gallery"
        ref="gallery"
        v-swiper:gallerySwiper="{
          loop: true,
          loopedSlides: phoneSize,
          spaceBetween: 5,
          slidesPerView: slidesPerView,
          touchRatio: 0.2,
          slideToClickedSlide: true,
        }">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in photos" :key="index">
            <img :src="item" alt>
          </div>
        </div>
      </div>


    </div>
    <p class="thumb--pic" v-if="data.ptStockPublish.certifiedType === '5A'">
      <img src="@/assets/img/xiehui.png" alt="图片">
    </p>
  </div>
</template>


<script>
import { trim, split, concat } from 'lodash'
export default {
  name: 'Thumb',
  components: {
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      slidesPerView: 5
    }
  },

  computed: {
    photos() {
      let oPhotoStr = this.data.ptStockPublish.photoUrls
      let photoLinks = []
      if (oPhotoStr) {
        photoLinks = split(oPhotoStr, ',').map(str => {
          return trim(str)
        })

        if (photoLinks.length < this.slidesPerView) {
          let dvalue = this.slidesPerView - photoLinks.length
          let dmultiple = Math.floor(dvalue / photoLinks.length) + 1

          photoLinks = concat(
            photoLinks,
            ...[...Array(dmultiple)].map(() => photoLinks)
          )
        }
      }

      return photoLinks
    },

    phoneSize() {
      return this.photos.length
    },
    imgSize: {
      get() {
        return this.photos.length > 0
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const preview = this.$refs.preview.swiper
      const gallery = this.$refs.gallery.swiper
      preview.controller.control = gallery
      gallery.controller.control = preview
    })
  }
}
</script>

<style lang="postcss" scoped>
@import 'depot.postcss';
.thumb--con {
  position: relative;
}
.thumb {
  width: var(--depotDetailThumbWidth);
}
.thumb--pic {
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 99;
}
.thumb-preview {
  height: 440px !important;
  width: 100%;
}
.thumb-preview .swiper-slide {
  & img {
    width: 100%;
    height: 100%;
  }
}

.thumb-gallery {
  height: 82px !important;
  box-sizing: border-box;
  margin-top: 10px;
}

.thumb-gallery .swiper-slide {
  width: 20%;
  height: 100%;
  opacity: 0.4;
  cursor: pointer;
  & img {
    width: 100%;
    height: 100%;
  }
}

.thumb-gallery .swiper-slide-active {
  opacity: 1;
}

/* .thunm-nav-btn {
  background-color: #999;
} */

:root {
  --hot-depots-btn: {
    background-color: var(--siteColor);
    background-size: 50%;
  }
}

.thunm-nav-btn {
  @apply --hot-depots-btn;
  /* color: var(--siteColor); */
}
</style>

