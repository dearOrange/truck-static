<template>
  <div class="result">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <item :data="item"></item>
      </li>
    </ul>
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
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.result {
  & > ul > li {
    padding: 25px 15px;
    border-bottom: 1px solid rgba(242, 242, 242, 1);
    cursor: pointer;
    &:hover {
      background: rgba(248, 248, 248, 1);
    }
  }
}
</style>

