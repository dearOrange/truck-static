<template>
  <div class="success">
    <svg class="icon" aria-hidden="true">
      <use v-bind:xlink:href="'#icon-chenggong'"></use>
    </svg>
    <div>发布成功</div>
  </div>
</template>

<script>
export default {
  name: 'success'
}
</script>

<style lang="less" scoped>
.success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 172px;
  padding: 16px 0;
  background: #fff;
  svg {
    display: block;
    width: 54px;
    height: 54px;
    color: #00ae66;
  }
  div {
    margin-top: 6px;
  }
}
</style>

