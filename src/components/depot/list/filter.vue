<template>
  <div class="filter">
    <div class="filter--lt">
      <div class="filter-oper">
        <a
          :class="{'active': activeType === item.type}"
          v-for="item in filters"
          :key="item.type"
          @click="select(item.type)"
        >{{item.label}}</a>
      </div>
    </div>
    <div class="filter--rt">
      <slot></slot>
    </div>
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
  data() {
    return {
      activeType: this.value
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
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--siteColor);
}

.filter-oper {
  display: flex;
  & > a {
    display: inline-block;
    padding: 16px 32px;
    cursor: pointer;
    &.active {
      background: var(--siteColor);
      color: #fff;
      text-decoration: none;
      cursor: default;
    }
  }
}
.filter--rt {
  align-self: center;
  display: flex;
}
</style>

