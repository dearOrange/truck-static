<template>
  <ul class="truck-list">
    <li class="truck-list--item" v-for="(item, index) in [...new Array(10)]" :key="index">
      <item></item>
    </li>
  </ul>
</template>

<script>
import Item from './item'

export default {
  name: 'List',
  components: {
    Item
  }
}
</script>

<style lang="postcss" scoped>
.truck-list--item {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 109px;
    z-index: var(--zIndex1);
    width: 1px;
    height: 100%;
    background: #cecece;
  }
  &:first-child {
    &:after {
      margin-top: 35px;
    }
  }
}
</style>

