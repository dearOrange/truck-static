<template>
  <div class="tags">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  props: {
    tagItem: {
      type: Boolean | String,
      default: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.tags {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
