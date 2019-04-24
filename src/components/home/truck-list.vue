<template>
  <div class="list">
    <div class="list--item" v-for="(item, index) in list" :key="index">
      <cool-link-thumbnails
        :link="'/depot/' + Math.floor(Math.random()*100000)"
        :width="350"
        :height="202"
        class="item--thumbnails"
      >
        <template slot="desc" slot-scope="slotProps">
          <truck-desc :show-more="slotProps.hover"></truck-desc>
        </template>
      </cool-link-thumbnails>
    </div>
  </div>
</template>

<script>
import TruckDesc from './truck-desc'

export default {
  name: 'TruckList',
  components: {
    TruckDesc
  },
  data() {
    return {
      list: Array.from(Array(6))
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
.list--item {
  position: relative;
  width: 350px;
  height: 290px;
  &:nth-child(n + 4) {
    margin-top: 50px;
  }
}
.item--thumbnails {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  &:hover {
    z-index: var(--zIndex6);
  }
}
</style>


