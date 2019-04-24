<template>
  <div class="filter">
    <div class="filter-lt"></div>
    <div class="filter--rt">
      <div class="sorts">
        <sort class="sorts--item" :content="'综合排序'" value="A" :sort="changeSort"></sort>
        <sort class="sorts--item" :content="'发布时间'" value="B" :sort="changeSort"></sort>
        <sort class="sorts--item" :content="'价格最优'" :value="['D','E']">
          <template slot="arrow">
            <arrow :sort="changeSort"/>
          </template>
        </sort>
        <sort class="sorts--item" :content="'最近入驻'" value="C" :sort="changeSort"></sort>
      </div>
    </div>
  </div>
</template>

<script>
import Sort from './sort.vue'
import Arrow from './arrow.vue'

export default {
  name: 'ResultFilter',
  components: {
    Sort,
    Arrow
  },
  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: String | Number
  },

  data() {
    return {
      current: this.value
    }
  },

  methods: {
    changeSort(sortValue) {
      this.$emit('change', sortValue)
    }
  }
}
</script>

<style lang="postcss" scoped>
.filter {
  display: flex;
  justify-content: space-between;
}

.sorts {
  display: flex;
  align-items: center;
  padding: 36px 0;
  & > .sorts--item {
    margin-left: 25px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>

