<template>
  <div class="condition-slider">
    <span class="slider-label" v-if="label">
      {{label}}
    </span>
    <div class="slider-content">
      <el-slider
        v-model="sliderValue"
        range
        :min="min"
        :max="max"
        @chage="onChange"  
      >
      </el-slider>
    </div>
    <cool-link-button size="tiny" themes="primary round">筛选</cool-link-button>
  </div>
</template>

<script>
export default {
  name: 'ConditionSlider',

  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      required: true
    },
    initialValue: {
      type: Array,
      default() {
        return [0, 0]
      }
    },
    label: {
      type: String
    }
  },

  data() {
    return {
      sliderValue: [...this.initialValue]
    }
  },

  methods: {
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
  margin: 0 6px;
}
</style>


