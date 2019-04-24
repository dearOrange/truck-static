<template>
  <div>
    <cool-link-header :searchable="false" :full="true"/>
    <div class="map">
      <map-hang class="map--hang" :pop-key="depotId">
        <template slot="search">
          <depot-search :params="params" @search="onSearch"></depot-search>
        </template>
        <template slot="result">
          <depot-result>
            <template slot="head">
              <result-statistics :total="page.pageTotal"></result-statistics>
              <result-filter
                v-model="params.accordingSort"
                :filters="[
                    {
                      label: '综合排序',
                      type: ''
                    },
                    {
                      label: '库容',
                      type: 'B'
                    },
                    {
                      label: '发布时间',
                      type: 'C'
                    }
                  ]"
              ></result-filter>
            </template>
            <template slot="content">
              <cool-link-loading v-if="loading"></cool-link-loading>
              <template v-else>
                <cool-link-empty v-if="isEmpty"></cool-link-empty>
                <cool-link-error v-else-if="isError" type="nopic" :message="this.list.message"></cool-link-error>
                <result-list v-else :list="list"></result-list>
              </template>
            </template>
          </depot-result>
        </template>
      </map-hang>
      <depot-map :list="list" class="map--scene"/>
    </div>
  </div>
</template>

<script>
import MapHang from '@components/map/hang.vue'
import DepotMap from '@components/depot/map/map.vue'
import DepotSearch from '@components/depot/map/search.vue'
import DepotResult from '@components/depot/map/result.vue'

import ResultStatistics from '@components/depot/map/statistics.vue'
import ResultFilter from '@components/depot/map/filter.vue'

import ResultList from '@components/depot/map/list.vue'

import asyncFetchMixin from '@/mixins/async-fetch'
import reactiveFetchMixin from '@/mixins/reactive-fetch'
import DepotApi from '@/api/depot'

import { CLEAR_MAP_DEPOT } from '@/store/types'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Map',
  mixins: [asyncFetchMixin(DepotApi.getList), reactiveFetchMixin],
  components: {
    MapHang,
    DepotMap,
    DepotSearch,
    DepotResult,
    ResultStatistics,
    ResultFilter,
    ResultList
  },
  data() {
    return {
      params: {
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
      pageSize: 8
    }
  },
  methods: {
    ...mapMutations({
      clear: CLEAR_MAP_DEPOT
    })
  },

  computed: {
    ...mapGetters({
      depotId: 'getDepotId'
    })
  },

  beforeRouteLeave(to, from, next) {
    this.clear()
    next()
  }
}
</script>

<style lang="postcss" scoped>
.map {
  position: relative;
  height: calc(100vh - var(--siteHeaderHeight));
  overflow: hidden;
}

.map--scene {
  width: 100%;
  height: 100%;
}
</style>


