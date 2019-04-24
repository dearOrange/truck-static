<template>
  <div v-if="done">
    <cool-link-header/>
    <cool-link-error v-if="isError" type="nopic" :message="data.message" :min-height="600"></cool-link-error>
    <div v-else class="detail">
      <div class="mid-layout detail--content">
        <renter :data="data" class="detail--lt"></renter>
        <div class="detail--rt">
          <box :title="'基本要求'">
            <text-value class="detail--item" :text="'需求面积：'" :value="data.demandArea +' ㎡ '"></text-value>
            <text-value
              class="detail--item"
              :text="'需求温度：'"
              :value="(data.temperatureLower ? data.temperatureLower + ' ℃ ' + '~' : '') + (data.temperatureUpper ? data.temperatureUpper + ' ℃ ' :'')"
            ></text-value>
            <text-value
              class="detail--item"
              :text="'计划入驻：'"
              :value="$dateFormat(data.planEnterDate, 'YYYY-MM-DD')"
            ></text-value>
            <text-value class="detail--item" :text="'计划租期：'" :value="data.planRentPeriodName"></text-value>
            <text-value class="detail--item" :text="'区域：'" :value="data.province + '' + data.city"></text-value>
            <text-value
              class="detail--item"
              :text="'价格：'"
              :value="data.expectedPriceType === 'N' ? data.expectedPriceTypeName : data.expectedPriceBegin + '-' + data.expectedPriceEnd + ' ' + data.stockPriceUnitName"
            ></text-value>
          </box>
          <box :title="'配套设施及服务'">
            <text-value class="detail--item" :text="'需求服务：'">
              <cool-link-dict dict="SupportService" :keys="data.supportService.split(',')"></cool-link-dict>
            </text-value>
            <text-value class="detail--item" :text="'必要设备：'">
              <cool-link-dict dict="SupportFacility" :keys="data.supportFacility.split(',')"></cool-link-dict>
            </text-value>
            <text-value class="detail--item" :text="'服务模式：'">
              <cool-link-dict
                dict="ServiceMode"
                :keys="data.serviceMode ? data.serviceMode.split(',') : ''"
              ></cool-link-dict>
            </text-value>
          </box>
          <box :title="'货品信息'">
            <text-value class="detail--item" :text="'货品品类：'" :value="data.productCategoryName"></text-value>
            <!-- <text-value class="detail--item" :text="'货品名称：'" :value="data.productName"></text-value> -->
            <!-- <text-value class="detail--item" :text="'货品数量：'" :value="data.productNumber"></text-value> -->
            <text-value class="detail--item" :text="'货品图片：'" :value="photoUrls" :is-image="true"></text-value>
            <text-value class="detail--item" :text="'其他说明：'" :value="data.otherDesc"></text-value>
          </box>
        </div>
      </div>
    </div>
    <cool-link-footer/>
  </div>
</template>

<script>
import Author from '@components/rent/detail/author.vue'
import Renter from '@components/rent/detail/renter.vue'
import Box from '@components/rent/detail/box.vue'
import TextValue from '@components/rent/detail/text-value.vue'

import UserRequire from '@components/rent/detail/user-require.vue'
import RequireInfo from '@components/rent/detail/require-info.vue'

// import { SupportFacility, SupportService } from '@/utils/dictionary'

import detailFetchMixin from '@/mixins/detail-fetch'
import RentApi from '@/api/rent'
import commonApi from '@/api/common'

export default {
  name: 'Detial',
  mixins: [detailFetchMixin(RentApi.getDetail)],
  components: {
    Author,
    Renter,
    Box,
    TextValue,
    UserRequire,
    RequireInfo
  },

  props: {
    id: {
      type: String | Number,
      required: true
    }
  },

  computed: {
    photoUrls() {
      return this.data.photoUrls ? this.data.photoUrls.split(',') : []
    }
  },

  methods: {
    init() {
      this.addFooter()
    },

    async addFooter() {
      let data = {
        relatedDataType: 'SR',
        relatedDataUkid: this.id
      }
      let { success } = await commonApi.addFooter(data)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="postcss" scoped>
.detail {
  padding: 35px 0 97px;
  background-color: #f5f5f6;
}

.detail--content {
  display: flex;
  justify-content: space-between;
}

.detail--lt {
  flex-shrink: 0;
  width: 380px;
}
.detail--rt {
  flex: 1 auto;
  margin-left: 20px;
}

.detail--item {
  margin: 12px 0;
}
</style>
