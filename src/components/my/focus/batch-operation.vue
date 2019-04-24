<template>
  <div class="batch-operation">
    <cool-link-button title="删除" class="btn-item" icon="shanchu" icon-bg-color="#E6E5E5" icon-color="#333" themes="stuffed" size="tiny" @click.native.prevent="batchDelete()"></cool-link-button>
  </div>
</template>
<script>
export default {
  name: 'BatchOperation',

  data() {
    return {
      checked: false
    }
  },

  watch: {},
  methods: {
    batchDelete() {
      this.$emit('remove')
    }
  }
}
</script>

<style lang="postcss" scoped>
.batch-operation {
  display: flex;
  align-items: center;
  & .btn-item {
    margin-left: 10px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>


