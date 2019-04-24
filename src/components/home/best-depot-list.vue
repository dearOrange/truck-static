<template>
  <cool-link-async-loader :loader="fetch">
    <template slot-scope="list">
      <div class="list">
        <cool-link-thumbnails
          :link="'/depot/' + item.ptStockPublish.stockPublishUkid"
          class="best-depot--item"
          width="200"
          height="230"
          v-for="(item, index) in list"
          :key="index"
          direction="horizontal"
          :srcImg="item.ptStockPublish.photoUrls"
        >
          <template slot="desc">
            <best-depot-desc :data="item"></best-depot-desc>
          </template>
        </cool-link-thumbnails>
      </div>
    </template>
  </cool-link-async-loader>
</template>
<script>
import BestDepotDesc from './best-depot-desc'
import depotApi from '@/api/depot'

export default {
  name: 'BestDepotList',
  components: {
    BestDepotDesc
  },

  methods: {
    fetch() {
      return depotApi.getPopularList(2)
    }
  }
}
</script>

<style lang="postcss" scoped>
.list {
  width: 100%;
  display: flex;
  justify-content: space-between;

  & .best-depot--item {
    width: 550px;
  }
}
</style>

