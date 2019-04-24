<template>
  <div class="cert-content">
    <div class="cert-icon">
      <div class="icon-bg" :class="item.icon">
        <svg class="icon" :class="item.icon" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-' + item.icon"></use>
        </svg>
      </div>
      <div class="cert--title">{{item.name}}</div>
    </div>
    <div class="cert-gocert">
      <div v-if="item.indent()" class="cert--aleary">
        <p>已认证</p>
        <svg class="icon" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-suo'"></use>
        </svg>
      </div>
      <div v-else class="cert--indent">{{item.isIdentify}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CertContent',
  props: {
    item: Object
  }
}
</script>

<style lang="less" scoped>
.cert-content {
  height: 130px;
  border: 1px solid rgba(233, 233, 233, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  margin-bottom: 30px;
  .cert-icon {
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon-bg {
      width: 74px;
      height: 74px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      &.renzhengchenggong1 {
        background: rgba(206, 220, 248, 1);
      }
      &.cheliangrenzheng {
        background: rgba(255, 231, 204, 1);
      }
      &.shidirenzheng {
        background: rgba(202, 246, 236, 1);
      }
      &.huoyuan1 {
        background: rgba(184, 226, 180, 1);
      }
      svg {
        display: block;
        width: 40px;
        height: 37px;
        &.renzhengchenggong1 {
          fill: #356ee1 !important;
        }
        &.cheliangrenzheng {
          fill: #ff9d1e !important;
        }
        &.shidirenzheng {
          fill: #50e3c2 !important;
        }
        &.huoyuan1 {
          fill: #5fc340 !important;
        }
      }
    }
    div {
      font-size: 20px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
  }
  .cert-gocert .cert--indent {
    width: 120px;
    height: 42px;
    border: 1px solid rgba(0, 174, 102, 1);
    font-size: 18px;
    color: rgba(0, 174, 102, 1);
    text-align: center;
    line-height: 42px;
    cursor: pointer;
  }
  .cert--aleary {
    display: flex;
    align-items: center;
    p {
      font-size: 18px;
      color: rgba(0, 174, 102, 1);
    }
    svg {
      width: 22px;
      height: 28px;
      color: #00ae66;
      margin-left: 10px;
    }
  }
}
</style>

