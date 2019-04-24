<template>
  <div class="my-label">{{text}}</div>
</template>

<script>
export default {
  name: 'MyLabel',
  props: ['text']
}
</script>

<style lang="postcss" scoped>
.my-label {
  font-size: 24px;
  line-height: 24px;
}
</style>

