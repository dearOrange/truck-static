<template>
  <div>
    <cool-link-header :searchable="false"/>
    <div class="list">
      <div class="list--search">
        <div class="wrap">
          <cool-link-search
            :init-value="params.currency"
            @search="onSearch"
            :side-button="{
              text: '地图找库',
              action: () => {
                 this.$router.push({
                   name: `depot-map`
                 })
              }
            }"
          ></cool-link-search>
        </div>
      </div>
      <div class="mid-layout">
        <cool-link-whitespace size="40"></cool-link-whitespace>
        <conditions :params="params"></conditions>
        <cool-link-whitespace size="40"></cool-link-whitespace>
        <result-filter
          initial-filter-type
          v-model="params.accordingSort"
          :filters="[{
              label: '综合排序',
              type: ''
            },
            {
              label: '库容从大到小',
              type: 'B'
            },
            {
              label: '发布时间',
              type: 'C'
            }
          ]"
        >
          <!-- <result-types @change="onListTypeChange" class="result--types"></result-types> -->
          <min-page @change="onPageChange" :page="page"></min-page>
        </result-filter>
        <template v-if="loading">
          <cool-link-loading></cool-link-loading>
        </template>
        <template v-else>
          <cool-link-empty v-if="isEmpty"></cool-link-empty>
          <cool-link-error v-else-if="isError" type="nopic" :message="this.list.message"></cool-link-error>
          <template v-else>
            <result :list="list" :theme="type">
              <template slot="statistics">
                <cool-link-whitespace size="20"></cool-link-whitespace>
                <div class="result--statistics">
                  <span>1号冷链为您找到</span>
                  <em>{{page.pageTotal}}</em>条信息
                </div>
                <cool-link-whitespace size="20"></cool-link-whitespace>
              </template>
            </result>
            <cool-link-whitespace size="80"></cool-link-whitespace>
            <cool-link-pagination @change="onPageChange" :page="page"></cool-link-pagination>
          </template>
        </template>
        <cool-link-whitespace size="40"></cool-link-whitespace>
      </div>

      <div class="list--recommended">
        <cool-link-whitespace size="40"></cool-link-whitespace>
        <div class="inner mid-layout">
          <cool-link-five label="冷库精选" :data-loader="fetchRecommend">
            <template slot-scope="scope">
              <recommend-desc :data="scope"></recommend-desc>
            </template>
          </cool-link-five>
        </div>
        <cool-link-whitespace size="40"></cool-link-whitespace>
      </div>
    </div>
    <cool-link-footer/>
  </div>
</template>
<script>
import Conditions from '@components/depot/list/conditions.vue'
import Result from '@components/depot/list/result.vue'
import ResultFilter from '@components/depot/list/filter.vue'
import ResultTypes from '@components/depot/list/types.vue'
import MinPage from '@components/depot/list/min-page.vue'

import RecommendDesc from '@components/depot/recommend-desc'

import asyncFetchMixin from '@/mixins/async-fetch'
import reactiveFetchMixin from '@/mixins/reactive-fetch'
import depotApi from '@/api/depot'

export default {
  name: 'List',
  components: {
    Conditions,
    ResultFilter,
    ResultTypes,
    MinPage,
    Result,
    RecommendDesc
  },
  mixins: [asyncFetchMixin(depotApi.getList), reactiveFetchMixin],

  data() {
    return {
      params: {
        provinceCode: '',
        cityCode: '',
        districtCode: '',
        district: '',
        platformType: '',
        splitable: '',
        suitableCategory: '',
        certifiedType: '',
        price: '',
        temperature: '',
        emptyCapacity: '',
        emptyArea: '',
        accordingSort: '',
        currency: ''
      },
      pageSize: 8,
      type: 'a'
    }
  },

  methods: {
    fetchRecommend() {
      return depotApi.getPopularList(5)
    },
    onListTypeChange(type) {
      this.type = type
    }
  },

  created() {
    let initParams = this.$route.query
    Object.keys(initParams).forEach(key => {
      this.params[key] = initParams[key]
    })
  }
}
</script>

<style lang="postcss" scoped>
.list--search {
  padding: 40px 0;
  background: #f0f0f0;
  & > .wrap {
    width: 912px;
    margin: 0 auto;
  }
}

.result--types {
  margin-right: 8px;
}
.result--statistics {
  font-size: 22px;
  font-weight: 700;
  & > em {
    margin: 0 4px;
    font-style: normal;
    color: var(--siteColor);
  }
}

.list--recommended {
  background: #f5f5f6;
}
</style>

