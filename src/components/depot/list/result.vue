<template>
  <div class="result">
    <div class="statistics">
      <slot name="statistics"></slot>
    </div>
    <div class="list">
      <item
        :data="item"
        class="list-item"
        v-for="(item) in list"
        :key="item.ptStockPublish.stockPublishUkid"
      ></item>
    </div>
  </div>
</template>
<script>
import Item from './item.vue'

export default {
  name: 'Result',
  components: {
    Item
  },
  props: {
    theme: {
      type: String
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    theme(newTheme) {
      // console.log(newTheme)
    }
  }
}
</script>
<style lang="postcss" scoped>
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.list-item {
  &:nth-child(n + 3) {
    margin-top: 75px;
  }
}
</style>


