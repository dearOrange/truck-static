<template>
  <cool-link-async-loader :loader="fetch">
    <template slot-scope="list">
      <div class="list">
        <cool-link-thumbnails
          :link="'/depot/' + item.ptStockPublish.stockPublishUkid"
          v-for="(item, index) in list"
          :key="index"
          :mark="item.expectedPriceType === 'S' ? item.ptStockPriceList[0].price + item.ptStockPriceList[0].stockPriceUnitName : '面议'"
          width="250"
          height="192"
          :srcImg="item.ptStockPublish.photoUrls"
        >
          <template slot="desc">
            <new-depot-desc :data="item"></new-depot-desc>
          </template>
        </cool-link-thumbnails>
      </div>
    </template>
  </cool-link-async-loader>
</template>

<script>
import NewDepotDesc from './new-depot-desc'
import pageApi from '@/api/homepage'

import { sleep } from '@utils'

export default {
  name: 'NewDepot',
  components: {
    NewDepotDesc
  },

  methods: {
    fetch() {
      return pageApi.newStock(4)
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

