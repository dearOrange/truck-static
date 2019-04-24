<template>
  <div class="sort" @click="onClick" :style="sortStyle" :class="sortClass">
    <p>{{content}}</p>
    <p class="sort--arrow">
      <slot name="arrow"></slot>
    </p>
  </div>
</template>

<script>
import { isFunction } from 'lodash'

export default {
  name: 'Sort',
  props: {
    content: String,
    value: {
      type: String | Number | Array
    },
    sort: {
      type: Function
    }
  },

  computed: {
    clickable() {
      return this.sort && isFunction(this.sort)
    },

    sortStyle() {
      return {
        cursor: this.clickable ? 'pointer' : 'default'
      }
    },

    sortClass() {
      return {
        sort__active: this.isCurrent
      }
    },

    isCurrent() {
      let { value } = this.$parent
      return value === this.value
    }
  },
  methods: {
    onClick() {
      if (this.clickable) {
        this.sort(this.value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sort {
  display: flex;
  align-items: center;
}
.sort__active {
  color: var(--siteColor);
}
.sort--arrow {
  margin-left: 3px;
}
</style>

