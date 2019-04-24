<template>
  <div class="conditions">
    <div class="conditions--wrap">
      <!-- <cool-link-condition
        v-model="districtCode"
        label="位置区域"
        :list="[
          {label: '', text: '全国'},
          {label: '110000,110100', text: '北京市'},
          {label: '330000,330100', text: '杭州市'},
          {label: '440000,440300', text: '深圳市'},
        ]"
      >
        <template slot="customized">
          <cascader :level="2" v-model="districtCode"></cascader>
        </template>
      </cool-link-condition>-->
      <cool-link-condition v-model="params.provinceCode" label="选择省份" :list-render="provinceRender"></cool-link-condition>
      <cool-link-whitespace size="15"></cool-link-whitespace>
      <cool-link-condition v-if="hasCitys" v-model="params.cityCode" label="选择城市" :list="cityList"></cool-link-condition>
      <cool-link-whitespace v-if="hasCitys" size="15"></cool-link-whitespace>
      <cool-link-condition
        v-model="params.stockType"
        label="温层类型"
        :list-render="dictListRender('StockType')"
      ></cool-link-condition>
      <cool-link-whitespace size="15"></cool-link-whitespace>
      <cool-link-condition
        v-model="params.planEnter"
        label="入驻时间"
        :list="[
          {label: '', text: '不限'},
          {label: 7, text: '一周内'},
          {label: 14, text: '两周内'},
          {label: 30, text: '一月内'}
        ]"
      ></cool-link-condition>
    </div>
  </div>
</template>



<script>
import ConditionSlider from './condition-slider.vue'
// import Cascader from './cascader.vue'
import config from '@/config'
import { isUndefined, concat } from 'lodash'
import { StockType } from '@/utils/dictionary'
import commonApi from '@/api/common'

export default {
  name: 'Conditions',
  components: {
    ConditionSlider
    // Cascader
  },
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cityList: []
    }
  },

  computed: {
    districtCode: {
      get() {
        let { provinceCode, cityCode } = this.params
        if (!provinceCode && !cityCode) {
          return ''
        } else {
          return `${provinceCode},${cityCode}`
        }
      },
      set(values) {
        let [provinceCode, cityCode] = values.split(',')
        this.params.provinceCode = isUndefined(provinceCode) ? '' : provinceCode
        this.params.cityCode = isUndefined(cityCode) ? '' : cityCode
      }
    },
    hasCitys: {
      get() {
        return this.cityList.length > 0
      }
    }
  },

  methods: {
    async provinceRender() {
      let { success, data: list } = await commonApi.getProvinces()

      if (success) {
        list = list.map(item => {
          return {
            label: item.areaId,
            text: item.areaName
          }
        })
        list = concat({ label: '', text: '不限' }, list)
      } else {
        list = []
      }
      return list
    },
    async cityRender(code) {
      let { success, data: list } = await commonApi.getCitys(code)

      if (success) {
        list = list.map(item => {
          return {
            label: item.areaId,
            text: item.areaName
          }
        })
        list = concat({ label: '', text: '不限' }, list)
      } else {
        list = []
      }
      return list
    },
    dictListRender(dictType) {
      return async function() {
        let { success, data: list } = await commonApi.getDicts(dictType)
        if (success) {
          list = list.map(item => {
            return {
              label: item[config.dict.key],
              text: item[config.dict.val]
            }
          })
          list = concat({ label: '', text: '不限' }, list)
        } else {
          list = []
        }
        return list
      }
    }
  },
  watch: {
    'params.provinceCode': {
      handler: async function(newCode) {
        this.cityList = []
        this.params.cityCode = ''
        if (newCode) {
          this.cityList = await this.cityRender(newCode)
        }
      }
    }
  },
  mounted() {}
}
</script>

<style lang="postcss" scoped>
</style>


