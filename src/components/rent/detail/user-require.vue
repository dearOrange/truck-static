<template>
    <div class="user-require">
        <div class="user-title">
            <div class="title-tag"></div>
            <div class="title-info">{{title}}</div>
        </div>
        <div class="require-list">
            <ul>
                <slot name="userRequire"></slot>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'userrequire',
  props: {
    title: String
  }
}
</script>

<style lang="less" scoped>
.user-require {
  padding: 47px 40px 26px 50px;
  background: #fff;
  margin-bottom: 20px;
  .user-title {
    padding-bottom: 17px;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
    display: flex;
    .title-tag {
      width: 6px;
      height: 20px;
      background: rgba(0, 174, 102, 1);
    }
    .title-info {
      font-size: 18px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
      margin-left: 9px;
    }
  }
  .require-list {
    margin-top: 27px;
  }
}
</style>
