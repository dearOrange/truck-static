<template>
  <div class="rentable-truck">
    <div class="rentable-truck--preview">
      <img src="@/assets/img/house.png" alt="图片">
      <div class="rentable-truck--sold-mark" v-if="isSold">
        <span>已被</span>
        <span>抢单</span>
      </div>
    </div>
    <div class="rentable-truck--title">
      <span class="text">寻求普通货车</span>
      <span class="base-info">有电子16吨，求9.6米以上的普通货车</span>
    </div>
    <div class="rentable-truck--line"></div>
    <div class="rentable-truck--detail">
      <div class="item move-dir">
        <svg class="icon icon-dw" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-dingwei2'"></use>
        </svg>
        <span>广东省深圳市</span>
        <svg class="icon icon-kw" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-kaiwang'"></use>
        </svg>
        <span>江苏省南京市</span>
      </div>
      <div class="item publish-time">
        <svg class="icon" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-clock'"></use>
        </svg>
        <span>发布时间 2018-10-27</span>
      </div>
      <div class="item load-time">
        <svg class="icon" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-huoche'"></use>
        </svg>
        <span>装车时间2018-12-27</span>
      </div>
    </div>

    <div class="rentable-truck--buy" v-if="!isSold">
      <div class="buy-inner">
        <a href="#">马上抢单</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'rentableTrucks',
  props: {
    // 是否售完
    isSold: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="postcss" scoped>
.rentable-truck {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 380px;
  border: 1px solid #f5f5f5;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.14);
  &:hover {
    & .rentable-truck--buy {
      display: block;
    }
  }
}
.rentable-truck--preview {
  position: relative;
  width: 110px;
  height: 82px;
  & > img {
    width: 100%;
    height: 100%;
  }

  & .rentable-truck--sold-mark {
    position: absolute;
    bottom: -40px;
    right: -40px;
  }
}

.rentable-truck--sold-mark {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background: rgba(204, 204, 204, 0.58);
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.14);
  border-radius: 50%;
  transform: rotate3d(0, 0, 1, -45deg);
  & > span {
    color: #fff;
    font-size: 16px;
  }
}

.rentable-truck--title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  & > .text {
    font-size: 18px;
    font-weight: 700;
  }
  & > .base-info {
    margin-top: 10px;
    color: var(--siteTextLightColor);
  }
}

.rentable-truck--line {
  width: 300px;
  height: 1px;
  margin: 25px 0;
  background: #ededed;
}

.rentable-truck--detail {
  & .item {
    display: flex;
    align-items: center;
    margin: 20px 0 0;
    &:first-child {
      margin-top: 0;
    }
  }
  & .icon {
    margin-right: 5px;
    font-size: 22px;
    color: var(--siteTextLightColor);
  }
  & .icon-kw {
    margin: 0 5px;
    font-size: 32px;
  }
}

.rentable-truck--buy {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;

  & .buy-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: color-mod(var(--siteColor) alpha(70%));

    & > a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 60px;
      border: 2px solid #fff;
      font-size: 18px;
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>


