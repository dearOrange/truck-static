<template>
  <div class="truck-desc">
    <div class="truck-desc--motion">
      <span class="from">河南省郑州市</span>
      <svg class="icon" aria-hidden="true">
        <use v-bind:xlink:href="'#icon-huoche'"></use>
      </svg>
      <span class="to">云南省昆明市</span>
    </div>
    <div class="truck-desc--detail">
      <div class="publish-date" v-show="!showMore">发布时间：2018-06-26 15:39</div>
      <transition @enter="enter">
        <div class="more" v-show="showMore">
          <p>始发地: 河南省 郑州市 市辖区</p>
          <p>目的地: 云南省 昆明市 市辖区</p>
          <p>承运方名称:1号冷链</p>
          <p>车型:冷藏车</p>
          <p>车长：7.2-9.6米</p>
          <p>发布时间：2018-06-26 15:39</p>
          <p>联系方式：138****6626</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TruckDesc',
  props: {
    showMore: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    beforeEnter(...args) {
      console.log(args)
    },
    enter: function(el, done) {
      // ...
      // done()
      setTimeout(() => {
        done()
      }, 3000)
    }
  }
}
</script>

<style lang="postcss" scoped>
.truck-desc {
  padding: 16px 18px;
  background: #fff;
}
.truck-desc--motion {
  display: flex;
  align-items: center;
  font-size: 16px;

  & > .icon {
    margin: 0 8px;
    font-size: 24px;
  }
}

.truck-desc--detail {
  margin-top: 10px;
  & .publish-date {
    font-size: 12px;
    color: rgba(102, 102, 102, 1);
  }

  & .more p {
    font-size: 14px;
    line-height: 24px;
  }
}
</style>


