<template>
  <div class="condition-slider">
    <span class="slider-label" v-if="label">{{label}}</span>
    <div class="slider-content">
      <el-slider v-model="sliderValue" range :min="min" :max="max"></el-slider>
    </div>
    <cool-link-button size="tiny" themes="primary round" @click="onSelected">筛选</cool-link-button>
  </div>
</template>

<script>
import { split, join } from 'lodash'

export default {
  name: 'ConditionSlider',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      required: true
    },
    value: {
      type: String
    },
    label: {
      type: String
    }
  },

  data() {
    return {
      sliderValue: [this.min, this.max]
    }
  },

  watch: {
    value: {
      handler(newVal) {
        let arr = split(newVal, ',', 2)
        if (arr.length === 1) {
          if (arr[0] === '') {
            arr = [this.min, this.max]
          } else {
            arr.push(this.max)
          }
        }
        this.sliderValue = arr
      },
      immediate: true
    }
  },

  methods: {
    onSelected() {
      this.$emit('change', join(this.sliderValue, ','))
    }
  }
}
</script>

<style lang="postcss" scoped>
.condition-slider {
  display: flex;
  align-items: center;
}
.slider-label {
}
.slider-content {
  width: 150px;
  margin: 0 15px 0 10px;
}
</style>


