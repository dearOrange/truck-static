<template>
  <div class="depot-search">
    <cool-link-search @search="onSearch"/>
    <div class="condition">
      <cool-link-dropdown
        :label="'面积(㎡)'"
        :text-render="textRender('㎡')"
        :options="[
          {value: '', text: '不限'},
          {value: '0,1000'},
          {value: '1000,3000'},
          {value: '3000,6000'},
          {value: '6000,12000'},
          {value: '12000,20000'},
          {value: '20000'},
        ]"
        v-model="params.emptyCapacity"
        class="condition-item"
      >
        <template slot="additional">
          <dropdown-range-input></dropdown-range-input>
        </template>
      </cool-link-dropdown>
      <cool-link-dropdown
        :label="'冷库温度范围'"
        :text-render="textRender('°c')"
        :options="[
          {label: '', text: '不限'},
          {label: '-30,26', text: '多温区库'},
          {label: '-65,-35', text: '速冻库'},
          {label: '-25,-22', text: '超低温库'},
          {label: '-22,-18', text: '冷冻库'},
          {label: '0,5', text: '冷藏库'},
          {label: '10,15', text: '常温库'},
        ]"
        v-model="params.temperature"
        class="condition-item"
      >
        <template slot="additional">
          <dropdown-range-input></dropdown-range-input>
        </template>
      </cool-link-dropdown>
      <cool-link-dropdown
        :label="'价格(/㎡/月)'"
        :text-render="textRender('元')"
        :options="[
          {value: '', text: '不限'},
          {value: '0,80'},
          {value: '80,90'},
          {value: '90,100'},
          {value: '100,110'},
          {value: '110,120'},
          {value: '120'},
        ]"
        v-model="params.price"
        class="condition-item"
      >
        <template slot="additional">
          <dropdown-range-input></dropdown-range-input>
        </template>
      </cool-link-dropdown>
    </div>
  </div>
</template>

<script>
import DropdownRangeInput from '@components/map/dropdown-range-input'
import { formatRange } from '@utils'

export default {
  name: 'Search',

  components: {
    DropdownRangeInput
  },

  props: {
    params: {
      type: Object
    }
  },

  methods: {
    onSearch(currency = '') {
      this.params.currency = currency
      this.$emit('search')
    },
    textRender(unit, limit) {
      return function(text) {
        return formatRange(text, unit, limit)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.depot-search {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  & .condition {
    display: flex;

    & .condition-item {
      margin-left: 15px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>

