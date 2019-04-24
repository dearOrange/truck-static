<template>
  <cool-link-five :data="list" label="周边冷库">
    <template slot-scope="scope">
      <recommend-desc :data="scope"></recommend-desc>
    </template>
  </cool-link-five>
</template>

<script>
import depotApi from '@/api/depot'
import RecommendDesc from '@components/depot/recommend-desc'
import { isEqualWith } from 'lodash'
export default {
  name: 'Near',

  components: {
    RecommendDesc
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      list: []
    }
  },

  watch: {
    data: function(newQuery, oldQuery) {
      let isEqual = isEqualWith(newQuery, oldQuery, function(nVal, oVal) {
        return (
          nVal.districtCode === oVal.districtCode &&
          nVal.cityCode === oVal.cityCode
        )
      })
      if (!isEqual) {
        this.fetch()
      }
    }
  },

  methods: {
    async fetch() {
      let { districtCode, cityCode } = this.data
      let { success, data } = await depotApi.getRecommendList(
        5,
        cityCode,
        districtCode
      )
      this.list = data
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>
