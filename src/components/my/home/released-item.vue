<template>
  <div class="released-item">
    <released-img :data="data"></released-img>
    <released-content :data="data" class="released-item--content"></released-content>
    <released-btn
      class="released-item--btn"
      @deleteData="deleteData(data)"
      @refreshData="refreshData(data)"
      @editData="editData(data)"
    ></released-btn>
  </div>
</template>

<script>
import ReleasedImg from './released-img.vue'
import ReleasedBtn from './released-btn.vue'
import ReleasedContent from './released-content.vue'
export default {
  name: 'ReleasedItem',
  props: {
    data: Object
  },
  components: {
    ReleasedImg,
    ReleasedBtn,
    ReleasedContent
  },
  methods: {
    deleteData(data) {
      this.$emit('deleteOne', data)
    },
    editData(data) {
      this.$emit('editOne', data)
    },
    refreshData(data) {
      this.$emit('refreshOne', data)
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.released-item {
  display: flex;
  padding: 30px 37px 30px 30px;
  background-color: #fff;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}

.released-item--content {
  flex: 1 auto;
  margin: 0 60px 0 15px;
}

.released-item--btn {
  align-self: center;
}
</style>

