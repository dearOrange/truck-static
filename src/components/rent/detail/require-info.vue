<template>
  <li class="require-info">
    <div class="require-one">{{label}}</div>
    <div v-if="isPic" class="require-two">{{labelCon}}</div>
    <div v-if="!isPic" class="require-two">
      <div class="goods-img" v-for="(item, index) in imgList" :key="index">
        <img src="@/assets/img/default.jpg" alt="图片">
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'requireinfo',
  props: {
    label: String,
    labelCon: String,
    isPic: {
      type: Boolean | String,
      default: true
    },
    imgList: Array
  },
  data() {
    return {
      //   isPic: true
    }
  }
}
</script>

<style lang="less" scoped>
.require-info {
  display: flex;
  margin-bottom: 14px;
  div {
    font-size: 14px;
    line-height: 14px;
    &.require-one {
      width: 5em;
      flex-shrink: 0;
      color: rgba(102, 102, 102, 1);
    }
    &.require-two {
      color: #333;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-left: 10px;
      .goods-img {
        width: 280px;
        height: 220px;
        // margin-left: 20px;
        &:nth-child(n + 3) {
          margin-top: 20px;
        }
        // &:nth-child(odd) {
        //   margin-left: 0;
        // }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>

