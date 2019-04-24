<template>
  <div class="radio">
    <div class="options">
      <radio-option
        class="options--item"
        v-for="(item, index) in options"
        :key="index"
        :value="item.label"
      >{{item.text}}</radio-option>
    </div>
  </div>
</template>

<script>
import RadioOption from './option'

export default {
  name: 'Radio',
  components: {
    RadioOption
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 选项值
    value: String | Number,
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
      radioValue: this.value,
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
    radioValue(newVal) {
      this.$emit('change', this.radioValue)
    },
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.radioValue = newVal
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
.radio {
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


