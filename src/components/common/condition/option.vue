<template>
  <span class="option" :class="optionClass" @click="select">
    <slot></slot>
  </span>
</template>
<script>
import { includes, remove, split, join, isEmpty } from 'lodash'

export default {
  name: 'ConditionOption',

  props: {
    value: String | Number,

    themes: {
      type: String,
      default: ''
    }
  },

  computed: {
    optionClass() {
      let themes = isEmpty(this.themes) ? [] : split(this.themes, ' ')
      let themesClasses = themes.reduce((acc, theme) => {
        return {
          ...acc,
          [`option__${theme}`]: true
        }
      }, {})
      return {
        ...themesClasses,
        [`option__active`]: this.isActive ? true : false
      }
    },
    isActive() {
      let { value, multi } = this.$parent
      if (multi) {
        let arr = split(value, ',')
        return includes(arr, String(this.value))
      } else {
        return value === this.value
      }
    }
  },

  methods: {
    select() {
      let { value: parentValue, multi } = this.$parent
      let self = this
      let emitChangeValue
      if (multi) {
        let arr = parentValue === '' ? [] : split(parentValue, ',')
        if (this.isActive) {
          remove(arr, item => {
            return item === String(self.value)
          })
        } else {
          arr.push(String(this.value))
        }
        emitChangeValue = join(arr, ',')
      } else {
        emitChangeValue = this.isActive ? '' : this.value
      }
      this.$parent.$emit('change', emitChangeValue)
    }
  }
}
</script>

<style lang="postcss" scoped>
.option {
  display: inline-block;
  padding: 4px;
  border-radius: 2px;
  cursor: pointer;
}

.option__active {
  background: var(--siteColor);
  color: #fff;
}
</style>




