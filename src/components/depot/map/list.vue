<template>
  <ul class="map-list">
    <li v-for="item in list" :key="item.ptStockPublish.stockPublishUkid" @click="save(item)">
      <cool-link-thumbnails
        class="best-depot--item best-depot--list"
        width="192"
        height="136"
        clean
        direction="horizontal"
        :src-img="item.ptStockPublish.photoUrls"
      >
        <template slot="desc">
          <depot-desc :data="item"></depot-desc>
        </template>
      </cool-link-thumbnails>
    </li>
  </ul>
</template>

<script>
import DepotDesc from './desc.vue'

import { SAVE_MAP_DEPOT } from '@/store/types'
import { mapMutations } from 'vuex'

export default {
  name: 'List',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    DepotDesc
  },
  methods: {
    ...mapMutations({
      save: SAVE_MAP_DEPOT
    })
  }
}
</script>

<style lang="postcss" scoped>
.map-list > li {
  margin-top: 25px;
  cursor: pointer;
  &:first-child {
    margin-top: 0;
  }
}
.best-depot--list {
  box-shadow: none;
}
</style>

