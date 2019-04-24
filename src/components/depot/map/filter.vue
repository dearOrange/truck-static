<template>
  <div class="filter">
    <ul>
      <li
        :class="{'active': value === item.type}"
        v-for="item in filters"
        :key="item.type"
        @click="select(item.type)"
      >
        <a>{{item.label}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ResultFilter',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    filters: {
      type: Array,
      required: true
    },
    value: {
      type: Number | String
    }
  },
  methods: {
    select(type) {
      // 如果已选中的按钮上, 则不做任何处理
      if (type === this.activeType) {
        return
      }
      this.activeType = type
      this.$emit('change', type)
    }
  }
}
</script>

<style lang="postcss" scoped>
.filter {
  padding: 20px 40px 15px;
  & ul {
    display: flex;
    & > li {
      margin-left: 25px;
      &:first-child {
        margin-left: 0;
      }
      & > a {
        font-size: 16px;
        color: var(--siteTextColor);
        cursor: pointer;
      }
      &.active {
        & > a {
          color: var(--siteColor);
          cursor: default;
        }
      }
    }
  }
}
</style>

