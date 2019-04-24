<template>
  <div v-if="done">
    <cool-link-header/>
    <cool-link-error v-if="isError" type="nopic" :message="data.message" :min-height="600"></cool-link-error>
    <div v-else class="detail mid-layout">
      <el-breadcrumb class="detail--breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="data.province">{{data.province}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="data.city">{{data.city}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="data.country">{{data.country}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{data.ptStockPublish.publishTitle}}</el-breadcrumb-item>
      </el-breadcrumb>
      <detail-meta :data="data"></detail-meta>
      <detail-tabs :data="data" class="detail--tabs">
        <template slot="t1">
          <detail-basic :data="data"></detail-basic>
        </template>
        <template slot="t2">
          <detail-device :data="data"></detail-device>
        </template>
        <template slot="t3">
          <detail-feature :data="data"></detail-feature>
        </template>
        <template slot="t4">
          <detail-case :data="data"></detail-case>
        </template>
        <!-- <template slot="t5">
          <detail-live-picture :data="data"></detail-live-picture>
        </template>-->
        <template slot="t6">
          <detail-map :data="data"></detail-map>
        </template>
      </detail-tabs>

      <cool-link-whitespace size="45"></cool-link-whitespace>
      <cool-link-five :data-loader="fetchRecommend" label="冷库精选">
        <template slot-scope="scope">
          <recommend-desc :data="scope"></recommend-desc>
        </template>
      </cool-link-five>
      <cool-link-whitespace size="45"></cool-link-whitespace>
      <detail-near :data="data"></detail-near>
    </div>
    <cool-link-footer/>
  </div>
</template>

<script>
import DetailMeta from '@components/depot/detail/meta.vue'
import DetailTabs from '@components/depot/detail/tabs.vue'
import DetailBasic from '@components/depot/detail/basic.vue'
import DetailDevice from '@components/depot/detail/device.vue'
import DetailFeature from '@components/depot/detail/feature.vue'
import DetailCase from '@components/depot/detail/case.vue'
import DetailLivePicture from '@components/depot/detail/live-picture.vue'
import DetailMap from '@components/depot/detail/map.vue'
import DetailNear from '@components/depot/detail/near.vue'
import RecommendDesc from '@components/depot/recommend-desc'

import detailFetchMixin from '@/mixins/detail-fetch'
import depotApi from '@/api/depot'
import commonApi from '@/api/common'

export default {
  name: 'Detail',
  mixins: [detailFetchMixin(depotApi.getDetail)],
  components: {
    DetailMeta,
    DetailTabs,
    DetailBasic,
    DetailDevice,
    DetailFeature,
    DetailCase,
    DetailLivePicture,
    DetailMap,
    DetailNear,
    RecommendDesc
  },
  data() {
    return {
      data: null
    }
  },

  methods: {
    fetchRecommend() {
      return depotApi.getPopularList(5)
    },

    addFooter() {
      let data = {
        relatedDataType: 'SL',
        relatedDataUkid: this.$route.params.id
      }
      commonApi.addFooter(data).then(({ success }) => {
        if (success) {
        }
      })
    }
  },
  mounted() {
    this.addFooter()
  }
}
</script>

<style lang="postcss" scoped>
.detail {
  padding: 50px 0;
}

.detail--breadcrumb {
  margin-bottom: 22px;
}
.detail--tabs {
  margin-top: 60px;
}
</style>


