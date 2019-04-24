<template>
  <div class="publish">
    <div class="title">确认发布？</div>
    <!-- <div class="tip">您未进行个人身份认证，认证后信息曝光度会提升哟</div> -->
    <div class="tip"></div>
    <div class="click-btn">
      <div class="btn-fr" @click="goAhead">继续发布</div>
      <!-- <div class="btn-fr" @click="doClick">前往认证</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Publish',
  methods: {
    async doClick() {
      // TODO

      this.$emit('close', { success: 0 })
    },
    goAhead() {
      this.$emit('close', { success: 1 })
    }
  }
}
</script>

<style lang="less" scoped>
.publish {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  width: 416px;
  padding: 61px 70px 52px;
  background: #fff;
  .title {
    font-size: 24px;
    line-height: 24px;
    color: rgba(51, 51, 51, 1);
  }
  .tip {
    font-size: 18px;
    line-height: 18px;
    color: rgba(51, 51, 51, 1);
    margin: 45px 0 53px;
  }
  .click-btn {
    display: flex;
    justify-content: space-around;
    div {
      width: 180px;
      height: 50px;
      border: 1px solid rgba(233, 233, 233, 1);
      text-align: center;
      line-height: 50px;
      font-size: 16px;
      cursor: pointer;
      &.btn-fl {
        color: rgba(153, 153, 153, 1);
      }
      &.btn-fr {
        margin-left: 30px;
        background: rgba(0, 174, 102, 1);
        color: #fff;
      }
    }
  }
}
</style>
