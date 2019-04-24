<template>
  <div class="select" :class="selectClass" v-outside-click="hide">
    <div class="select--box" @click="show">
      <div class="select--text" :style="{width: selectMaxWidth}">{{selectText}}</div>
      <i class="arrow" :class="{
        expanded
      }"></i>
    </div>
    <div class="select--dropdown" v-show="expanded">
      <ul>
        <li @click="select(index)" v-for="(item, index) in selectOptions" :key="item.value">
          <span
            class="text"
            :class="{
              active: index === selectedIndex
            }"
          >{{item.label}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { isPlainObject, findIndex, maxBy } from 'lodash'

import { logger } from '@utils'
const log = logger.getLogger('select')

export default {
  name: 'Select',
  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    // 选项值
    value: String | Number,
    // 选项列表
    data: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      default: 'middle',
      validator: function(value) {
        return ['tiny', 'small', 'middle', 'large'].includes(value)
      }
    }
  },

  data() {
    return {
      expanded: false,
      selectedIndex: -1
    }
  },

  computed: {
    selectClass() {
      return {
        [`select__${this.size}`]: true
      }
    },

    selectText() {
      if (this.selectedIndex !== -1) {
        return this.selectOptions[this.selectedIndex].label
      } else {
        return ''
      }
    },

    selectValue() {
      if (this.selectedIndex !== -1) {
        return this.selectOptions[this.selectedIndex].value
      } else {
        return ''
      }
    },

    selectOptions: (function _IFEE() {
      function toCompOptions(list) {
        return list.map(item => {
          let isObj = isPlainObject(item)
          return isObj ? item : { label: item, value: item }
        })
      }

      return {
        get() {
          let options = toCompOptions(this.data)
          log.debug(`列表格式化: ${JSON.stringify(options)}`)
          return options
        }
      }
    })(),

    selectMaxWidth() {
      let maxItem = maxBy(this.selectOptions, option => {
        return option.label.length
      })
      let max = maxItem.label.length
      return `${max}em`
    }
  },

  watch: {
    selectOptions: {
      handler(options) {
        this.selectedIndex = findIndex(options, option => {
          return option.value === this.value
        })
      },
      immediate: true
    },

    value: {
      handler(value) {
        this.selectedIndex = findIndex(this.selectOptions, option => {
          return option.value === value
        })
      },
      immediate: true
    }
  },

  methods: {
    hide() {
      this.expanded = false
    },

    show() {
      this.expanded = true
    },
    select(index) {
      if (index !== this.selectedIndex) {
        this.selectedIndex = index
        this.$emit('change', this.selectOptions[this.selectedIndex].value)
        this.$emit('changeIndex', this.selectedIndex)
      }
      this.hide()
    }
  },

  mounted() {}
}
</script>

<style lang="postcss" scoped>
:root {
  --select-arrow-size: 8px;
  --select-item-height: 24px;
}

.select {
  position: relative;
}

.select--box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border: 1px solid var(--selectBorderColor);
  cursor: pointer;
  & > .select--text {
    margin-right: 4px;
  }
  & > .arrow {
    width: 8px;
    height: 8px;
    border-style: solid;
    border-width: 1px;
    border-color: transparent transparent var(--siteTextLightColor)
      var(--siteTextLightColor);
    transform: rotate3d(0, 0, 1, -45deg);
    transition: transform 0.3s ease-in-out;
    transform-origin: 50% 50%;
    &.expanded {
      transform: rotate3d(0, 0, 1, 135deg);
    }
  }
}

.select--dropdown {
  position: absolute;
  left: 0;
  top: 100%;
  z-index: var(--zIndex2);
  width: 100%;
  border-style: solid;
  border-color: var(--selectBorderColor);
  border-width: 0 1px 1px;
  background-color: #fff;
  & ul {
    max-height: calc(var(--select-item-height) * 10);
    overflow-y: auto;
  }
  & li {
    cursor: pointer;
    height: var(--select-item-height);
    line-height: @height;
    &:hover {
      background-color: rgba(0, 0, 0, 0.14);
    }

    & .text {
      &.active {
        color: var(--siteColor);
      }
    }
  }
}

.select__tiny {
  & > .select--box {
    height: var(--tiny);
    padding: 0 8px;
  }

  & > .select--dropdown li {
    padding: 0 8px;
  }
}
.select__small {
  & > .select--box {
    height: var(--small);
    padding: 0 12px;
  }
  & > .select--dropdown li {
    padding: 0 12px;
  }
}
.select__middle {
  & > .select--box {
    height: var(--middle);
    padding: 0 15px;
  }
  & > .select--dropdown li {
    padding: 0 15px;
  }
}
.select__large {
  & > .select--box {
    height: var(--large);
    padding: 0 20px;
  }
  & > .select--dropdown li {
    padding: 0 20px;
  }
}
</style>


