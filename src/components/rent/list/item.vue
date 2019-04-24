<template>
  <div class="item">
    <text-value class="item--text-value" text="区域" :value="data.province +' ' + data.city"></text-value>
    <text-value class="item--text-value" text="需求面积" :value="data.demandArea + '㎡'" :bold="true"></text-value>
    <text-value class="item--text-value" text="温层需求" :value="data.stockTypeName"></text-value>
    <text-value
      class="item--text-value"
      text="计划入驻"
      :value="$dateFormat(data.planEnterDate, 'YYYY-MM-DD')"
    ></text-value>
    <text-value
      class="item--text-value"
      text="更新时间"
      :value="$dateFormat(data.publishDate, 'YYYY-MM-DD')"
    ></text-value>
    <text-value
      class="item--text-value"
      text="价格"
      :value="data.expectedPriceType === 'N' ? data.expectedPriceTypeName : (data.expectedPriceBegin + '-' + data.expectedPriceEnd + ' ' + data.stockPriceUnitName)"
      :bold="true"
    ></text-value>
    <cool-link-button
      class="item--button"
      themes="linear"
      size="small"
      @click="goDetail(data.stockDemandUkid)"
    >查看详情</cool-link-button>

    <tags class="item--tags" :tagItem="tagItem">
      <auth-tag class="tags--item" color="#16c5ff" text="个人认证" v-if="data.realNameCertified === 1"></auth-tag>
      <!-- <auth-tag class="tags--item" text="货源认证"></auth-tag> -->
      <text-tag class="tags--item" color="#ff4646" :text="data.urgentRent" v-if="data.urgentRent"></text-tag>
    </tags>
  </div>
</template>

<script>
import Tags from './tags.vue'
import AuthTag from '@components/rent/auth-tag.vue'
import TextTag from '@components/rent/text-tag.vue'
import TextValue from './text-value'
export default {
  name: 'Item',
  components: {
    TextValue,
    Tags,
    AuthTag,
    TextTag
  },

  props: {
    className: String,
    tagItem: Boolean | String,
    data: Object
  },

  data() {
    return {
      isPrice: false
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: 'rent-detail',
        params: {
          id: String(id)
        }
      })
    }
  },
  mounted() {}
}
</script>

<style lang="postcss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 30px 0 0;
}

.item--text-value {
  flex-shrink: 1;
  flex-basis: 100%;
}

.item--button {
  flex-shrink: 0;
}

.item--tags {
  position: absolute;
  top: 0;
  left: 0;
  & .tags--item {
    margin-left: 6px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>


<style lang="less" scoped>
</style>

