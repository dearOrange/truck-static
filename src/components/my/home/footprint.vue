<template>
  <div class="footprint">
    <div class="footprint--list">
      <template v-if="loading">
        <cool-link-loading></cool-link-loading>
      </template>

      <template v-else>
        <cool-link-empty v-if="isEmpty"></cool-link-empty>
        <cool-link-error v-else-if="isError" type="nopic" :message="this.list.message"></cool-link-error>
        <template v-else>
          <FootPrintItem
            class="footprint--item"
            v-for="(item,index) in list"
            :key="index"
            :data="item"
            @collectFooter="collectFooter"
          ></FootPrintItem>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import FootPrintItem from './footprint-item.vue'
import myApi from '@/api/my'
import commonApi from '@/api/common'

import asyncFetchMixin from '@/mixins/async-fetch'
import reactiveFetchMixin from '@/mixins/reactive-fetch'

export default {
  name: 'footprint',

  mixins: [asyncFetchMixin(myApi.getFooterList), reactiveFetchMixin],

  components: {
    FootPrintItem
    // OnlineTrade
  },
  data() {
    return {
      isData: false,
      footerData: []
    }
  },
  methods: {
    collectFooter(val) {
      if (val.collect === 1) {
        let data = {
          relatedDataType: val.type,
          relatedDataUkid: val.id2
        }
        commonApi.addFollow(data).then(({ success }) => {
          if (success) {
            // this.footPrint()
          }
        })
      } else {
        myApi.cancelCollect(val.id1).then(({ success }) => {
          if (success) {
            // this.footPrint()
          }
        })
      }
    }
  },
  mounted() {
    // this.footPrint()
  }
}
</script>

<style lang="postcss" scoped>
.footprint--list {
  padding: 15px 0 35px;
}
.footprint--item {
  margin-top: 15px;
  &:first-child {
    margin-top: 0;
  }
}
</style>



