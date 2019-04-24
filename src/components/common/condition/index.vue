<template>
  <div class="condition">
    <div class="label" :style="customLabelStyle">{{label}}:</div>
    <div class="options">
      <condition-option
        class="options--item"
        v-for="(item, index) in options"
        :key="index"
        :multi="multi"
        :value="item.label"
      >{{item.text}}</condition-option>
    </div>
    <div class="customized">
      <slot name="customized"></slot>
    </div>
  </div>
</template>

<script>
import ConditionOption from './option'

export default {
  name: 'Condition',
  components: {
    ConditionOption
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 条件值
    value: String | Number | Array,
    // 标签
    label: {
      type: String,
      required: true
    },
    // 自定义标签样式
    labelStyle: {
      type: Object
    },
    // 选项
    list: {
      type: Array
    },

    listRender: {
      type: Function
    },
    // 是否支持多选
    multi: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      conditionValue: this.value,
      options: null
    }
  },
  computed: {
    isNotEmpty() {
      return this.options && this.options.length > 0
    },

    customLabelStyle() {
      let style = {}
      if (this.labelStyle) {
        style = this.labelStyle
      }
      return style
    }
  },
  watch: {
    conditionValue(newVal) {
      this.$emit('change', this.conditionValue)
    },
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.conditionValue = newVal
      }
    },
    list(newList, oldList) {
      this.options = newList
    }
  },
  methods: {
    async init() {
      let list = []
      if (this.list && this.list.length) {
        list = this.list
      } else if (this.listRender) {
        list = await this.listRender()
      }
      this.options = list
    }
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="postcss" scoped>
.condition {
  display: flex;
  flex-direction: row;
  /* align-items: center; */
}

.label {
  color: var(--siteTextWeakColor);
  width: 10em;
  flex-shrink: 0;
}

.options--item {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}

.customized {
  flex: 1 auto;
  display: flex;
  justify-content: flex-end;
}
</style>


