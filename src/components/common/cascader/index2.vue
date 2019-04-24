<template>
  <div class="cascader">
    <el-cascader size="large" :options="options" v-model="cascaderValue"></el-cascader>
  </div>
</template>

<script>
if (process.browser) {
  var {
    provinceAndCityData,
    regionData
  } = require('element-china-area-data')
}

export default {
  name: 'Cascader',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array | String,
      default() {
        return []
      }
    },
    level: {
      type: Number,
      default: 3,
      validator: function(value) {
        return [2, 3].indexOf(value) !== -1
      }
    }
  },
  // data() {
  //   return {
  //     selectedOptions: this.value || []
  //   }
  // },

  computed: {
    options() {
      return this.level === 2 ? provinceAndCityData : regionData
    },
    cascaderValue: {
      get() {
        let value = this.value
        if (value === '') {
          return []
        } else {
          return value.split(',')
        }
      },
      set(values) {
        this.$emit('change', values.join(','))
      }
    }
  }
}
</script>

