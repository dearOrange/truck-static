<template>
  <div class="conditions">
    <div class="conditions--wrap">
      <cool-link-condition v-model="params.provinceCode" label="选择省份" :list-render="provinceRender"></cool-link-condition>
      <cool-link-whitespace size="15"></cool-link-whitespace>
      <cool-link-condition v-if="hasCitys" v-model="params.cityCode" label="选择城市" :list="cityList"></cool-link-condition>
      <cool-link-whitespace v-if="hasCitys" size="15"></cool-link-whitespace>
      <cool-link-condition
        v-if="hasDistricts"
        v-model="params.districtCode"
        label="选择区域"
        :list="districtList"
      ></cool-link-condition>
      <cool-link-whitespace v-if="hasDistricts" size="15"></cool-link-whitespace>
      <cool-link-condition
        v-model="params.temperature"
        label="温层类型"
        :list="[
          {label: '', text: '不限'},
          {label: '-30,26', text: '多温区库'},
          {label: '-35,-65', text: '速冻库'},
          {label: '-22,-25', text: '超低温库'},
          {label: '-18,-22', text: '冷冻库'},
          {label: '0,5', text: '冷藏库'},
          {label: '10,15', text: '常温库'},
        ]"
      >
        <template slot="customized">
          <condition-slider label="温度:" :min="-30" :max="26" v-model="params.temperature"></condition-slider>
        </template>
      </cool-link-condition>
      <cool-link-whitespace size="15"></cool-link-whitespace>
      <cool-link-condition
        v-if="false"
        v-model="params.suitableCategory"
        label="适合产品品类"
        :multi="true"
        :list="[
          {label: 2, text: '水果'},
          {label: 3, text: '冻肉'},
          {label: 4, text: '水产'},
          {label: 5, text: '块茎菜类'},
          {label: 6, text: '薯类'},
          {label: 7, text: '豆类'},
          {label: 8, text: '绿菜叶'},
          {label: 9, text: '水生菜类'},
          {label: 10, text: '更多品类'},
        ]"
      >
        <template slot="customized"></template>
      </cool-link-condition>
      <cool-link-whitespace v-if="false" size="15"></cool-link-whitespace>
      <!-- <cool-link-condition
        v-model="params.emptyCapacity"
        label="库容范围"
        :list="[
          {label: '', text: '不限'},
          {label: '0,1000', text: '1000吨以下'},
          {label: '1000,4000', text: '1000吨~4000吨'},
          {label: '4000,10000', text: '4000吨~10000吨'},
          {label: '10000', text: '10000吨以上'},
        ]"
      >
        <template slot="customized"></template>
      </cool-link-condition>-->
      <!-- <cool-link-whitespace size="15"></cool-link-whitespace> -->
      <cool-link-condition
        v-model="params.price"
        label="价格(/㎡/月)"
        :list="[
          {label: '', text: '不限'},
          {label: '0,80', text: '80元以下'},
          {label: '80,90', text: '80元~90元'},
          {label: '90,100', text: '90元~100元'},
          {label: '100,110', text: '100元~110元'},
          {label: '110,120', text: '110元~120元'},
          {label: '120', text: '120元以上'},
          
        ]"
      >
        <template slot="customized">
          <condition-slider label="价格:" :max="120" v-model="params.price"></condition-slider>
        </template>
      </cool-link-condition>
      <cool-link-whitespace size="15"></cool-link-whitespace>
      <!-- 更多展示 -->
      <cool-link-condition
        v-if="isMore"
        v-model="params.emptyArea"
        label="面积(㎡)"
        :list="[
          {label: '', text: '不限'},
          {label: '0,1000', text: '1000㎡以下'},
          {label: '1000,3000', text: '1000-3000㎡'},
          {label: '3000,6000', text: '3000-6000㎡'},
          {label: '6000,12000', text: '6000-12000㎡'},
          {label: '12000,20000', text: '12000-20000㎡'},
          {label: '20000', text: '20000㎡以上'},
        ]"
      >
        <template slot="customized"></template>
      </cool-link-condition>
      <cool-link-whitespace v-if="isMore" size="15"></cool-link-whitespace>
      <cool-link-condition
        v-if="isMore"
        v-model="params.platformType"
        label="卸货平台"
        :list-render="dictListRender('PlatformType')"
      >
        <template slot="customized"></template>
      </cool-link-condition>
      <cool-link-whitespace v-if="isMore" size="15"></cool-link-whitespace>
      <cool-link-condition
        v-if="isMore"
        v-model="params.splitable"
        label="可否分割"
        :list="[
          {label: '', text: '不限'},
          {label: 0, text: '不可分割'},
          {label: 1, text: '可分割'},
        ]"
      >
        <template slot="customized"></template>
      </cool-link-condition>
      <cool-link-whitespace v-if="isMore" size="15"></cool-link-whitespace>
      <cool-link-condition
        v-if="isMore"
        v-model="params.certifiedType"
        label="冷库认证"
        :list-render="dictListRender('CertifiedType')"
      >
        <template slot="customized"></template>
      </cool-link-condition>
    </div>

    <div class="conditions--more">
      <a class="more-btn" @click="toggleMore">
        {{ isMore ? '隐藏选项':'更多选项'}}
        <svg class="icon" aria-hidden="true">
          <use v-bind:xlink:href="isMore ? '#icon-up-arrow':'#icon-down-arrow'"></use>
        </svg>
      </a>
    </div>
    <!-- <div class="condition--tag">
      <condition-tag></condition-tag>
    </div>-->
  </div>
</template>

<script>
import { concat } from 'lodash'
import { mapGetters } from 'vuex'

import commonApi from '@/api/common'
import config from '@/config'

import ConditionSlider from './condition-slider.vue'
import ConditionTag from './condition-tag.vue'

export default {
  name: 'Conditions',
  components: {
    ConditionSlider,
    ConditionTag
  },

  props: {
    params: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isMore: false,
      dictData: {},
      cityList: [],
      districtList: []
    }
  },

  computed: {
    ...mapGetters({
      cityCode: 'getCityCode'
    }),

    hasCitys: {
      get() {
        return this.cityList.length > 0
      }
    },

    hasDistricts() {
      return this.districtList.length > 0
    }
  },

  methods: {
    toggleMore() {
      this.isMore = !this.isMore
    },
    async provinceRender() {
      // let cityCode = this.cityCode
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
    async districtRender(code) {
      let { success, data: list } = await commonApi.getDistricts(code)

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
        this.districtList = []
        this.cityList = []

        this.params.cityCode = ''
        this.params.districtCode = ''

        if (newCode) {
          this.cityList = await this.cityRender(newCode)
        }
      }
    },
    'params.cityCode': {
      handler: async function(newCode) {
        this.districtList = []
        this.params.districtCode = ''
        if (newCode) {
          this.districtList = await this.districtRender(newCode)
        }
      }
    }
  },
  mounted() {}
}
</script>

<style lang="postcss" scoped>
.conditions--wrap {
  padding: 0 0 30px;
}
.conditions--more {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 1px;
  margin-bottom: 40px;
  background: #e0e0e0;

  & > .more-btn {
    position: absolute;
    left: 50%;
    top: -1px;
    text-align: center;
    width: 150px;
    height: 40px;
    margin-left: -75px;
    border-color: #e0e0e0;
    border-width: 0 1px 1px;
    border-style: solid;
    line-height: 40px;
    background: #fff;
    cursor: pointer;
    color: var(--siteTextColor);
  }
}
.condition--tag {
  margin-top: 80px;
}
</style>


