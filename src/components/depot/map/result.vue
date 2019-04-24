<template>
  <div class="result">
    <div class="head">
      <slot name="head"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',

  components: {}
}
</script>

<style lang="postcss" scoped>
.result {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  & .content {
    padding: 0 40px 20px;
    flex: 1 auto;
    overflow-y: auto;
  }
}
</style>

