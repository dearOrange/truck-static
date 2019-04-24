<template>
  <div class="truck-search">
    <div class="search-box">
      <cool-link-input v-model="params.from" class="inp" size="large" placeholder="请输入出发地"></cool-link-input>
      <div class="exchange">
        <span class="inner" @click="exchange">换</span>
      </div>
      <cool-link-input v-model="params.to" class="inp" size="large" placeholder="请输入目的地"></cool-link-input>
      <cool-link-button themes="primary" class="search--btn" size="large">搜索</cool-link-button>
    </div>
    <div class="condition">
      <cool-link-dropdown
        :label="'车型选择'"
        :options="[
          {value: '1', text: '车型1'},
          {value: '2', text: '车型2'},
          {value: '3', text: '车型3'},
          {value: '4', text: '车型4'},
          {value: '5', text: '车型5'},
        ]"
        align="left"
        v-model="params.a"
        class="condition-item"
      ></cool-link-dropdown>

      <cool-link-dropdown
        :label="'配送温度'"
        :options="[
          {value: '-100,-35'},
          {value: '-35,-18'},
          {value: '-18,-5'},
          {value: '-5,5'},
          {value: '5'},
        ]"
        v-model="params.b"
        class="condition-item"
        :text-render="textRender('°C',-50)"
      >
        <template slot="additional">
          <dropdown-range-input></dropdown-range-input>
        </template>
      </cool-link-dropdown>
    </div>
  </div>
</template>

<script>
import DropdownRangeInput from '../dropdown-range-input'
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
    exchange() {
      let from = this.params.from
      let to = this.params.to

      this.params.from = to
      this.params.to = from
    },

    textRender(unit, limit) {
      return function(text) {
        return formatRange(text, unit, limit,' ~ ')
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.truck-search {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.search-box {
  display: flex;
  align-items: center;
  & .inp {
    width: 190px;
    flex-shrink: 0;
  }
  & .exchange {
    position: relative;
    flex-shrink: 0;
    padding: 0 10px;
    margin: 0 5px;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      z-index: -1;
      width: 100%;
      height: 1px;
      background: #cecece;
    }
    & > .inner {
      display: block;
      width: 24px;
      height: 24px;
      line-height: @height;
      text-align: center;
      border-radius: 50%;
      background: var(--siteColor);
      color: #fff;
      cursor: pointer;
    }
  }

  & .search--btn {
    margin-left: 15px;
    flex-basis: 100%;
    flex-shrink: 1;
  }
}

.condition {
  display: flex;
  margin-right: 145px;
  & .condition-item {
    margin-left: 15px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>

