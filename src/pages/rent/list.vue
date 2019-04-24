<template>
  <div class="list">
    <cool-link-header/>
    <div class="mid-layout list--condition">
      <conditions :params="params"></conditions>
    </div>
    <div class="list--line"></div>
    <div class="mid-layout">
      <result-filter v-model="params.accordingSort"></result-filter>
    </div>
    <div class="mid-layout list--result">
      <template v-if="loading">
        <cool-link-loading></cool-link-loading>
      </template>
      <template v-else>
        <cool-link-empty v-if="isEmpty"></cool-link-empty>
        <cool-link-error v-else-if="isError" type="nopic" :message="this.list.message"></cool-link-error>

        <template v-else>
          <result-list :list="list"></result-list>
          <cool-link-whitespace size="45"></cool-link-whitespace>
          <cool-link-pagination @change="onPageChange" :page="page"></cool-link-pagination>
          <cool-link-whitespace size="45"></cool-link-whitespace>
        </template>
      </template>
    </div>
    <div class="list--recommended">
      <div class="mid-layout">
        <!-- <cool-link-recommend label="冷库需求推荐"></cool-link-recommend> -->
        <cool-link-five label="冷库需求推荐" :data="recomList">
          <template slot-scope="scope">
            <recommend-desc :data="scope"></recommend-desc>
          </template>
        </cool-link-five>
      </div>
    </div>
    <cool-link-footer/>
  </div>
</template>

<script>
import Conditions from '@components/rent/list/conditions.vue'
import ResultFilter from '@components/rent/list/filter.vue'
import ResultList from '@components/rent/list/result.vue'
import RecommendDesc from '@components/rent/recommend-desc'

import asyncFetchMixin from '@/mixins/async-fetch'
import reactiveFetchMixin from '@/mixins/reactive-fetch'

import rentApi from '@/api/rent'
import { mapGetters } from 'vuex'

export default {
  name: 'List',
  mixins: [asyncFetchMixin(rentApi.getList), reactiveFetchMixin],
  components: {
    Conditions,
    ResultFilter,
    ResultList,
    RecommendDesc
  },
  data() {
    return {
      params: {
        provinceCode: '',
        cityCode: '',
        stockType: '',
        planEnter: '',
        accordingSort: ''
      },
      recomList: []
    }
  },

  computed: {
    ...mapGetters({
      cityCode: 'getCityCode'
    })
  },

  watch: {
    'params.districtCode': {
      handler: function(newIndex, oldIndex) {
        this.params.provinceCode = newIndex[0]
        this.params.cityCode = newIndex[1]
      }
    },
    'params.cityCode': {
      handler: async function(newIndex, oldIndex) {
        if (newIndex) {
          this.fetchRecommend(newIndex)
        }
      }
    }
  },

  methods: {
    async fetchRecommend(code) {
      let { success, data } = await rentApi.getRecommendList(5, code)
      if (success) {
        this.recomList = data
      }
    }
  },

  mounted() {
    this.fetchRecommend()
  }
}
</script>

<style lang="postcss" scoped>
.list--condition {
  padding: 50px 0 40px;
}
.list--line {
  height: 1px;
  box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.14);
}
.list--recommended {
  padding: 40px 0;
  background: #f5f5f6;
}
</style>



