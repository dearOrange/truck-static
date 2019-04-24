<template>
  <div class="from-list">
    <div class="base-t">
      <h3>{{baseTxt}}</h3>
    </div>
    <div class="base-f">
      <slot name="fileFrom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Basefile',
  props: {
    baseTxt: String
  }
}
</script>

<style lang="less" scoped>
.from-list {
  background: #fff;
  margin-top: 10px;
}
.base-t {
  border-bottom: 1px solid rgba(233, 233, 233, 1);
  h3 {
    padding: 18px 0 4px 40px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    line-height: 14px;
  }
}
.base-f {
  padding: 22px 33px 46px 40px;
}
</style>

