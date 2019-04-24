<template>
  <div class="list">
    <rentable-truck-item v-for="(item, index) in list" :key="index" :is-sold="index == 2"></rentable-truck-item>
  </div>
</template>

<script>
import RentableTruckItem from './rentable-truck'
export default {
  name: 'RentableTruckList',
  components: {
    RentableTruckItem
  },

  data() {
    return {
      list: Array.from(Array(3))
    }
  }
}
</script>

<style lang="postcss" scoped>
.list {
  display: flex;
  justify-content: space-between;
}
</style>


