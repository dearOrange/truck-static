<template>
  <div class="tab-panel">
    <div class="hd">{{label}}</div>
    <div class="bd">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabPanel',
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.tab-panel {
  & > .hd {
    margin-bottom: 25px;
    font-size: 22px;
  }
}
</style>

