<template>
  <div class="batch-operation">
    <cool-link-button
      title="删除"
      class="btn-item"
      icon="close"
      icon-bg-color="#E6E5E5"
      icon-color="#333"
      themes="stuffed"
      size="tiny"
      v-if="!(data.mark === 'lose')"
      @click.native.prevent="batchDelete()"
    ></cool-link-button>
    <cool-link-button
      title="刷新"
      class="btn-item"
      icon="shuaxin"
      icon-bg-color="#E6E5E5"
      icon-color="#333"
      themes="stuffed"
      size="tiny"
      v-if="!data.isShow"
      @click.native.prevent="batchUpdate()"
    ></cool-link-button>
  </div>
</template>
<script>
export default {
  name: 'BatchOperation',
  props: {
    data: Object
  },
  data() {
    return {}
  },

  watch: {},
  methods: {
    batchDelete() {
      this.$emit('remove')
    },
    batchUpdate() {
      this.$emit('update')
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


