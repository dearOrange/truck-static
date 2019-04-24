<template>
  <div class="thermometer">
    <div class="thermometer--bar">
      <el-slider
        v-model="sliderValue"
        :range="true"
        :min="min"
        :max="max"
        :format-tooltip="formatter"
      ></el-slider>

      <div class="thermometer--scale scale" v-if="scaleable">
        <span
          class="scale--mark"
          :class="{'scale--mark__short': item.isMin}"
          v-for="item in scales"
          :key="item.value"
        >
          <span class="scale--value" v-if="!item.isMin">{{item.value}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { split, join, range as rangeFn } from 'lodash'

export default {
  name: 'Thermometer',
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
    scaleable: {
      type: Boolean,
      default: true
    },
    step: {
      type: Number,
      default: 10
    },
    minStep: {
      type: Number,
      default: 2
    },
    value: {
      type: String
    }
  },

  data() {
    return {
      sliderValue: [0, 0]
    }
  },

  computed: {
    scales() {
      let genScale = value => {
        return {
          value,
          isMin: value % this.step !== 0
        }
      }

      if (this.scaleable) {
        return rangeFn(this.min, this.max + this.minStep, this.minStep).map(
          genScale
        )
      }
    }
  },

  watch: {
    sliderValue(newVal) {
      this.$emit('change', join(newVal, ','))
    },
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
    formatter(value) {
      return `${value}°c`
    }
  }
}
</script>

<style lang="postcss" scoped>
:root {
  --wheelSize: 16px;
}

.thermometer {
  position: relative;
  padding: 0 calc(var(--wheelSize) / 2);
}
.thermometer--bar {
  position: relative;
}

.thermometer--scale {
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0;
  top: 34px;
  width: 100%;
}

.scale--mark {
  position: relative;
  width: 1px;
  height: 9px;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(124, 124, 124, 1);
  }
}
.scale--mark__short {
  &:before {
    height: 6px;
  }
}

.scale--value {
  position: absolute;
  left: 50%;
  top: 100%;
  width: 2em;
  margin-left: -1em;
  text-align: center;
  color: rgba(102, 102, 102, 1);
}
</style>


