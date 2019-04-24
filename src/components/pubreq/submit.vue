<template>
  <div class="submit-btn">
    <cool-link-button class="button cancel-btn" themes="block">取消</cool-link-button>
    <cool-link-button class="button" @click="saveDrafts" v-if="isSave" themes="primary block">保存为草稿</cool-link-button>
    <cool-link-button @click="onSubmit" class="button" themes="primary block">确认发布</cool-link-button>
  </div>
</template>

<script>
import Dialog from '@components/common/dialog'
import Publish from './publish.vue'
export default {
  name: 'Submit',
  props: {
    isSave: Boolean | String
  },
  methods: {
    onSubmit() {
      Dialog.open(Publish).then(result => {
        if (result.success === 1) {
          this.$emit('continueRelease')
        }
      })
    },
    saveDrafts() {
      this.$emit('saveDrafts')
    }
  }
}
</script>

<style lang="less" scoped>
.submit-btn {
  width: 652px;
  display: flex;
  justify-content: space-between;
  margin: 60px auto 0;
  .button {
    width: 200px;
    height: 50px;
    &.cancel-btn {
      border-color: rgba(0, 174, 102, 1);
      color: rgba(0, 174, 102, 1);
    }
  }
}
</style>

