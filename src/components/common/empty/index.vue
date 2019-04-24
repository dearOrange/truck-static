<template>
  <div class="empty">
    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'Empty',
  props: {
    text: {
      type: String,
      default: '无数据'
    }
  }
}
</script>

<style lang="postcss" scoped>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 400px;
}
</style>

