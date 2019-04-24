<template>
  <div class="setting">
    <div class="setting--item thermometer-range">
      <span class="label">冷库温度范围</span>
      <div class="content">
        <cool-link-thermometer :min="-30" :max="30" v-model="temperature"></cool-link-thermometer>
      </div>
    </div>
    <!-- <cool-link-condition
      v-model="emptyCapacity"
      label="库容范围"
      :label-style="{
        width: '7em',
        color: '#424242'
      }"
      :list="[
        {label: '', text: '不限'},
        {label: '0,1000', text: '1000吨以下'},
        {label: '1000,4000', text: '1000吨~4000吨'},
        {label: '4000,10000', text: '4000吨~10000吨'},
        {label: '1000', text: '10000吨以上'},
      ]"
    ></cool-link-condition>-->
    <cool-link-condition
      v-model="emptyCapacity"
      label="面积(㎡)"
      :label-style="{
        width: '7em',
        color: '#424242'
      }"
      :list="[
          {label: '', text: '不限'},
          {label: '0,1000', text: '1000㎡以下'},
          {label: '1000,3000', text: '1000-3000㎡'},
          {label: '3000,6000', text: '3000-6000㎡'},
          {label: '6000,12000', text: '6000-12000㎡'},
          {label: '12000,20000', text: '12000-20000㎡'},
          {label: '20000', text: '20000㎡以上'},
        ]"
    ></cool-link-condition>
    <cool-link-whitespace size="40"></cool-link-whitespace>
    <cool-link-condition
      v-model="price"
      label="价格(/㎡/月)"
      :label-style="{
        width: '7em',
        color: '#424242'
      }"
      :list="[
        {label: '', text: '不限'},
        {label: '0,80', text: '80元以下'},
        {label: '80,90', text: '80元~90元'},
        {label: '90,100', text: '90元~100元'},
        {label: '100,110', text: '100元~110元'},
        {label: '110,120', text: '110元~120元'},
        {label: '120', text: '120元以上'},
      ]"
    ></cool-link-condition>
    <cool-link-whitespace size="40"></cool-link-whitespace>
    <div class="setting--oper">
      <cool-link-button class="oper-btn" @click="cancel">取消</cool-link-button>
      <cool-link-button class="oper-btn" @click="confirm" themes="primary">确定</cool-link-button>
    </div>
  </div>
</template>

<script>
import { formatRange } from '@utils'

export default {
  name: 'SearchColdSetting',

  props: {},

  data() {
    return {
      temperature: '',
      emptyCapacity: '',
      price: ''
    }
  },

  methods: {
    cancel() {
      this.$emit('hide')
    },
    confirm() {
      let searchKeys = []
      if (this.temperature) {
        searchKeys.push({
          label: `温度范围:${formatRange(this.temperature, '°c', -30, '至')}`,
          value: this.temperature,
          query: 'temperature'
        })
      }
      if (this.emptyCapacity) {
        searchKeys.push({
          label: `库容范围:${formatRange(this.emptyCapacity, '吨')}`,
          value: this.emptyCapacity,
          query: 'emptyCapacity'
        })
      }
      if (this.price) {
        searchKeys.push({
          label: `价格范围:${formatRange(this.price, '元')}`,
          value: this.price,
          query: 'price'
        })
      }
      this.$emit('confirm', searchKeys)
      this.$emit('hide')
    }
  }
}
</script>

<style lang="postcss" scoped>
.setting {
  width: 100%;
  padding: 20px 40px;
  margin-top: 2px;
  background: #fff;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.14);
}

.setting--item {
  display: flex;
  align-items: center;
  &.thermometer-range {
    margin-bottom: 62px;
  }
  & > .label {
    width: 7em;
    font-size: 14px;
    color: rgba(66, 66, 66, 1);
  }
  & > .content {
    flex: 1 auto;
  }
}

.setting--radio {
  display: flex;
  justify-content: space-between;
}

.setting--oper {
  display: flex;
  justify-content: space-evenly;
  & > .oper-btn {
    margin: 0 0;
  }
}
</style>




