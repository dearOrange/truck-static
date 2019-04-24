<template>
  <div class="checkbox">
    <div class="options">
      <checkbox-option
        class="options--item"
        v-for="(item, index) in options"
        :key="index"
        :value="item.label"
      >{{item.text}}</checkbox-option>
    </div>
    <div class="customized">
      <slot name="customized"></slot>
    </div>
  </div>
</template>

<script>
import CheckboxOption from './option'

export default {
  name: 'Checkbox',
  components: {
    CheckboxOption
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 复选值
    value: Array,
    // 选项列表
    list: {
      type: Array
    },

    listRender: {
      type: Function
    }
  },

  data() {
    return {
      checkboxValue: this.value,
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
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.checkboxValue = newVal
      }
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
  }
}
</script>

<style lang="postcss" scoped>
.checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.label {
  color: var(--siteTextWeakColor);
  width: 10em;
}

.options {
  display: flex;
  flex-direction: row;
}
.options--item {
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
}
</style>


