<template>
  <div class="slider-bar">
    <div class="slider-container">
      <div class="sli">
        <img src="@/assets/img/erweima.png" alt="图片">
        <div class="sli--outer contacts">
          <div class="img--box">
            <img src="@/assets/img/gongzhonghao.png" alt="图片">
            <p>1号冷链官微</p>
          </div>
        </div>
      </div>
      <div class="sli">
        <svg class="icon" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-wechat'"></use>
        </svg>
        <div class="sli--outer contacts">
          <div class="img--box">
            <img src="@/assets/img/gongzhonghao.png" alt="图片">
            <p>1号冷链官微</p>
          </div>
        </div>
      </div>
      <div class="sli">
        <svg class="icon" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-24rexian'"></use>
        </svg>
        <div class="sli--outer contacts">
          <div class="wrap">
            <p>客服热线</p>
            <p class="contacts-tel">400-0827-888</p>
          </div>
        </div>
      </div>
      <div class="sli">
        <a
          title="在线QQ咨询"
          target="_blank"
          href="http://wpa.qq.com/msgrd?v=3&uin=2162804168&site=qq&menu=yes"
        >
          <svg class="icon" aria-hidden="true">
            <use v-bind:xlink:href="'#icon-qq'"></use>
          </svg>
        </a>
      </div>
      <div class="slider-back sli" @click="backTop" v-if="enoughTop">
        <svg class="icon" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-up-arrow'"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
if (process.browser) {
  var Between = require('between.js')
}

export default {
  name: 'Slider',

  data() {
    return {
      isTop: false,
      enoughTop: false
    }
  },

  computed: {},

  methods: {
    backTop() {
      let fromY = window.scrollY
      let time = 300
      new Between(fromY, 0)
        .time(300)
        .on('update', y => {
          window.scrollTo(0, y)
        })
        .on('complete', () => {
          this.isTop = true
        })
    },

    bindScroll() {
      window.addEventListener(
        'scroll',
        () => {
          window.requestAnimationFrame(() => {
            this.enoughTop = window.scrollY > 500
          })
        },
        false
      )
    }
  },

  mounted() {
    this.bindScroll()
  }
}
</script>

<style lang="postcss" scoped>
.slider-bar {
  position: fixed;
  right: 10px;
  bottom: 200px;
  z-index: 10000;

  & .slider-container {
    width: 56px;
    display: flex;
    flex-direction: column;
  }
}

.sli {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 56px;
  height: 56px;
  margin-top: 5px;
  cursor: pointer;
  background: #394043;
  &:first-child {
    margin-top: 0;
  }
  & > a > svg {
    width: 32px;
    height: 32px;
    color: #fff;
  }
  & > svg {
    width: 32px;
    height: 32px;
    color: #fff;
  }
  & > .sli--outer {
    display: none;
    position: absolute;
    top: 50%;
    right: 100%;

    & > .wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
      height: 100%;
      white-space: nowrap;
      &:after {
        position: absolute;
        left: 100%;
        top: 50%;
        content: '';
        width: 0;
        height: 0;
        margin-top: -6px;
        border-style: solid;
        border-width: 6px 10px;
        border-color: transparent transparent transparent var(--siteColor);
      }
    }
  }

  &:hover {
    & > .sli--outer {
      display: block;
    }
  }
}

:root {
  --contacts-content-height: 74px;
}
.contacts {
  height: var(--contacts-content-height);
  padding: 0 15px;
  margin-top: calc(@height / -2);
  display: none;
  & .wrap {
    padding: 0 20px;
    background: var(--siteColor);
    & > p {
      width: 100%;
      font-size: 16px;
      color: #fff;
      line-height: 24px;
      text-align: center;
    }
    & > p.contacts-tel {
      font-size: 24px;
      padding-top: 6px;
    }
  }
}
.img--box {
  position: relative;
  width: 130px;
  height: 160px;
  background: rgba(0, 174, 102, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  & > p {
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
  }
  &:after {
    position: absolute;
    left: 100%;
    top: 25%;
    content: '';
    width: 0;
    height: 0;
    margin-top: -6px;
    border-style: solid;
    border-width: 6px 10px;
    border-color: transparent transparent transparent var(--siteColor);
  }
}
</style>
