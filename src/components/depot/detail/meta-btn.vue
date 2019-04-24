<template>
  <div class="meta-btn" @click="onClick" :class="btnThemeClass">
    <span class="text">{{label}}</span>
    <span class="num">（{{num}}人{{ shortLabel || label }}）</span>
  </div>
</template>

<script>
import { isFunction } from 'lodash'

export default {
  name: 'MetaBtn',
  props: {
    theme: {
      type: String
    },
    count: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      required: true
    },
    shortLabel: {
      type: String
    },
    countRender: {
      type: Function
    }
  },

  data() {
    return {
      num: this.count,
      completed: false
    }
  },

  computed: {
    btnThemeClass() {
      if (this.theme) {
        return {
          [`meta-btn__${this.theme}`]: true
        }
      }
    }
  },

  methods: {
    onClick() {
      if (this.completed) {
        return
      }
      if (this.countRender && isFunction(this.countRender)) {
        this.countRender().then(success => {
          if (success) {
            this.completed = true
            this.num += 1
          }
        })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.meta-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 56px;
  padding: 0 48px;
  border: 1px solid #e9e9e9;
  line-height: 1.2;
  cursor: pointer;
  &.meta-btn__light {
    background: var(--siteColor);
    border-color: var(--siteColor);
    & > .text {
      color: #fff;
    }
    & > .num {
      color: #fff;
    }
  }

  & > .text {
    font-size: 20px;
  }
  & > .num {
    font-size: 12px;
    color: var(--siteTextWeakColor);
  }
}
</style>


