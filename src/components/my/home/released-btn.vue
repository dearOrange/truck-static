<template>
  <div class="released-btn">
    <cool-link-button
      title="删除"
      @click="handleDelete"
      class="btn-item"
      icon="close"
      icon-bg-color="#FD5076"
      icon-color="#fff"
      themes="stuffed"
      size="tiny"
    ></cool-link-button>
    <cool-link-button
      title="刷新"
      class="btn-item"
      icon="shuaxin"
      icon-bg-color="#3DC16D"
      icon-color="#fff"
      themes="stuffed"
      size="tiny"
      @click="handleRefresh"
    ></cool-link-button>
    <cool-link-button
      title="编辑"
      @click="handleEdit"
      class="btn-item"
      icon="bianji"
      icon-bg-color="#03A2F1"
      icon-color="#fff"
      themes="stuffed"
      size="tiny"
    ></cool-link-button>
  </div>
</template>

<script>
export default {
  name: 'ReleasedBtn',
  data() {
    return {
      rotate: false
    }
  },
  methods: {
    handleEdit() {
      this.$emit('editData')
    },
    handleDelete() {
      this.$emit('deleteData')
    },
    handleRefresh() {
      this.$emit('refreshData')
    }
  }
}
</script>

<style lang="postcss" scoped>
.released-btn {
  display: flex;
  & .btn-item {
    margin: 0 4px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

