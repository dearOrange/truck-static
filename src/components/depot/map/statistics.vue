<template>
  <div class="statistics">
    <ul>
      <li>
        <span class="primary">{{priceNum}}元/㎡/月</span>
        <span class="text secondly">本月参考均价</span>
      </li>
      <li>
        <span class="text">符合条件库源 {{total}} 个</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchPrice } from '@/api/price'
export default {
  name: 'Statistics',

  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      priceNum: 0
    }
  },
  methods: {
    async getPrice() {
      let { success, data } = await fetchPrice()
      if (success) {
        this.priceNum = data
      }
    }
  },
  mounted() {
    this.getPrice()
  }
}
</script>

<style lang="postcss" scoped>
.statistics {
  padding: 15px 40px;
  border-bottom: 1px solid var(--siteBorderColor);
  & ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > li {
      & .primary {
        font-size: 18px;
      }
      & .text {
        color: var(--siteTextLightColor);
      }
      & .secondly {
        margin-left: 10px;
      }
    }
  }
}
</style>

