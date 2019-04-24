<template>
  <div class="case">{{data.ptStockPublish.cooperationCase}}</div>
</template>
<script>
export default {
  name: 'Case',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
@import 'depot.postcss';
.case {
  width: var(--depotDetailLeftWidth);
}
</style>

