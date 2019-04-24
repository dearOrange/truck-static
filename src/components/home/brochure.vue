<template>
  <div class="brochure">
    <div class="brochure-list">
      <div class="brochure-list--item description">
        <div class="description--preview">
          <img :src="content.img" alt="图片">
        </div>
        <div class="description--text">
          <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
              <div class="swiper-slide swiper--text" v-for="(item, index) in list" :key="index">
                <img src="@/assets/img/youzhi.png" alt>
                <p class="brand">{{item.recommend}}</p>
                <h2>{{item.sub}}</h2>
                <cool-link-whitespace size="46"></cool-link-whitespace>
                <h3>{{item.sup}}</h3>
                <ul class="desc">
                  <li>可租面积：10000㎡</li>
                  <li>地理位置：浙江杭州江干区</li>
                </ul>
                <!-- <p class="desc" v-for="(item, index) in content.desc" :key="index">{{item}}</p> -->
                <cool-link-whitespace size="15"></cool-link-whitespace>
              </div>
            </div>
          </div>
          <div class="preview--pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Brochure',
  components: {
  },
  data() {
    let self = this
    return {
      list: [
        {
          img: require('@/assets/img/lunbo1.jpg'),
          sub: '优质仓库',
          sup: '浙江星网云仓  ·  冷冻仓',
          recommend: '1号冷链为您推荐'
        },
        {
          img: require('@/assets/img/lunbo1.jpg'),
          sub: '优质仓库',
          sup: '浙江星网云仓  ·  冷冻仓',
          recommend: '1号冷链为您推荐'
        }
      ],
      swiperOption: {
        loop: true,
        pagination: {
          clickable: true,
          el: '.preview--pagination',
          renderBullet(index, className) {
            return `<span class='${className} preview--pagination-item'></span>`
          }
        },
        on: {
          slideChangeTransitionEnd() {
            self.content = self.list[this.realIndex]
          }
        }
      },

      content: {}
    }
  },

  methods: {
    onChange(e) {}
  }
}
</script>

<style lang="postcss">
.preview--pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.preview--pagination-item {
  width: 12px;
  height: 12px;
  margin: 0 8px;
  cursor: pointer;
}
</style>


<style lang="postcss" scoped>
.brochure {
  width: 100%;
  height: 430px;
  background: rgba(238, 238, 241, 1);
  /* padding: 50px 0; */
  /* background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover; */
}

.brochure-list {
  position: relative;
  height: 100%;
  width: 1150px;
  margin: 0 auto;
}

.description {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.description--preview {
  width: 776px;
  height: 490px;
  margin-right: 45px;
  position: absolute;
  bottom: 18px;
  box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.35);
  /* left: 0; */
  & img {
    width: 776px;
    height: 490px;
  }
}
.description--text {
  width: 300px;
  align-self: flex-end;
  margin-top: 38px;
}
.swiper--text {
  & > img {
    width: 88px;
  }
  & > p.brand {
    font-size: 35px;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
  }
  & > h2 {
    font-size: 44px;
    margin: 0;
  }
  & > h3 {
    width: 320px;
    margin: 0 0 20px;
    font-size: 28px;
    font-weight: 700;
  }
  & > .desc {
    /* width: 260px; */
    /* display: flex;
    flex-wrap: wrap;
    justify-content: space-between; */
    & > li {
      font-size: 20px;
      color: rgba(51, 51, 51, 1);
      align-self: flex-start;
    }
  }
}

/* @media screen and (max-width: 1440px) {
  .description--text {
    width: 300px;
    & > h2 {
      font-size: 40px;
    }
    & > h3 {
      font-size: 50px;
    }
    & > .brands {
      & img {
        width: 520px;
      }
    }
  }

  .description--preview {
    width: 640px;
    height: 490px;
    & img {
      width: 640px;
      height: 490px;
    }
  }
} */
</style>


