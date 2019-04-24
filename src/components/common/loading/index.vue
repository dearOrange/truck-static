<template>
  <div class="loading">
    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    text: {
      type: String,
      default: '正在加载中...'
    }
  }
}
</script>

<style lang="postcss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>

