<template>
  <div class="item" @click="goDetail">
    <div class="item--lt">
      <div class="rate">
        <div class="inner">
          <span class="num">90%</span>
          <span>顺路度</span>
        </div>
      </div>
    </div>
    <div class="item--mid">
      <div class="dot"></div>
    </div>
    <div class="item--rt">
      <div class="car-info">
        <div class="basic">
          <span class="time">2018-11-12 9:00</span>
          <span class="flag">车辆认证</span>
        </div>
        <div class="address start">
          <svg class="icon" aria-hidden="true">
            <use class="icon-use" v-bind:xlink:href="'#icon-qidian'"></use>
          </svg>
          <em>杭州 ·</em>
          <span>江干区合达物流园流园流园流园</span>
        </div>
        <div class="address end">
          <svg class="icon" aria-hidden="true">
            <use v-bind:xlink:href="'#icon-zhongdian'"></use>
          </svg>
          <em>杭州 ·</em>
          <span>江干区合达物流园流园流园流园</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  methods: {
    goDetail() {
      this.$router.push({
        path: '/truck/' + Math.floor(Math.random() * 100000)
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
:root {
  --dp-arrow-w: 8px;
  --dp-arrow-h: 5px;
}

.item {
  position: relative;
  display: flex;
  cursor: pointer;
}

.item--mid {
  margin-left: 32px;
  margin-top: 35px;
}

.item--rt {
  margin-top: 23px;
  margin-left: 20px;
  padding-bottom: 60px;
}

.dot {
  position: relative;
  z-index: var(--zIndex2);
  width: 7px;
  height: 7px;
  background: var(--siteColor);
  border-radius: 50%;
}
.rate {
  padding: 4px;
  border-radius: 50%;
  background: rgba(255, 129, 2, 0.3);
  & > .inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 66px;
    line-height: 18px;
    background: #ff8102;
    border-radius: 50%;
    color: #fff;
    & > .num {
      font-weight: 700;
      font-size: 18px;
    }
  }
}

.car-info {
  & > .basic {
    margin-bottom: 35px;
    & > .time {
      display: inline-block;
      position: relative;
      height: 30px;
      padding: 0 8px;
      line-height: @height;
      border-radius: 4px;
      color: #fff;
      background: #394043;
      &::before {
        position: absolute;
        right: 100%;
        top: 50%;
        content: '';
        border-style: solid;
        border-width: var(--dp-arrow-h) var(--dp-arrow-w);
        border-color: transparent #394043 transparent transparent;
        margin-top: calc(var(--dp-arrow-h) * -1);
      }
    }
    & > .flag {
      display: inline-block;
      height: 30px;
      padding: 0 18px;
      margin-left: 5px;
      line-height: @height;
      color: var(--siteColor);
      background: #e1f5ed;
    }
  }
  & .address {
    display: flex;
    align-items: center;
    margin-top: 15px;
    &.start {
      & > .icon {
        /* border: 1px solid #fabb7b; */
        color: #fabb7b;
      }
    }
    &.end {
      & > .icon {
        /* border: 1px solid #7fb7f1; */
        color: #7fb7f1;
      }
    }
    & .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      width: 26px;
      margin-right: 8px;
      font-weight: 700;
    }
    & > em {
      font-weight: 700;
      margin-right: 4px;
    }
  }
}
</style>


