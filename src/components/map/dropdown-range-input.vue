<template>
  <div class="range--input">
    <cool-link-whitespace size="15"></cool-link-whitespace>
    <div class="inps">
      <cool-link-input class="rd-input" size="tiny" v-model="rangeMin"></cool-link-input>
      <span class="line"></span>
      <cool-link-input class="rd-input" size="tiny" v-model="rangeMax"></cool-link-input>
    </div>
    <div class="btns">
      <a class="confirm" @click="confirm">确认</a>
      <a class="cancel" @click="cancel">取消</a>
    </div>
    <cool-link-whitespace size="15"></cool-link-whitespace>
  </div>
</template>

<script>
import { join, split, gt, isFinite } from 'lodash'

export default {
  name: 'DropdownRangeInput',
  props: {
    min: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      rangeMin: '',
      rangeMax: ''
    }
  },

  methods: {
    confirm() {
      if (this.valid()) {
        let range = []
        range.push(this.rangeMin === '' ? this.min : this.rangeMin)
        if (this.rangeMax) {
          range.push(this.rangeMax)
        }
        this.select({ value: join(range, ',') })
      }
    },
    valid() {
      let errorMsg = ''
      if (this.rangeMin === '' && this.rangeMax === '') {
        errorMsg = `至少输入一个自选范围`
      } else if (!isFinite(+this.rangeMin) || !isFinite(+this.rangeMax)) {
        errorMsg = `请输入有效数字`
      } else if (
        gt(
          +this.rangeMin,
          this.rangeMax === '' ? Number.MAX_VALUE : +this.rangeMax
        )
      ) {
        errorMsg = `最小值不能高于最大值`
      }

      if (errorMsg) {
        this.$message({
          type: 'error',
          message: errorMsg,
          showClose: true
        })
        return false
      }
      return true
    },

    cancel() {
      this.hide()
      this.clear()
    },
    select(option) {
      this.$parent.select(option)
    },
    clear() {
      this.rangeMin = ''
      this.rangeMax = ''
    },
    hide() {
      this.$parent.hide()
    }
  },

  mounted() {
    // this.$parent
  }
}
</script>

<style lang="postcss" scoped>
.range--input {
  border-top: 1px solid #ddd;
  & .inps {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & .line {
      flex-shrink: 0;
      width: 10px;
      height: 1px;
      margin: 0 5px;
      background: var(--siteBorderColor);
    }
    & > .rd-input {
      width: 100%;
    }
  }

  & .btns {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 15px;
    & > a {
      margin-left: 10px;
    }
    & .cancel {
      color: var(--siteTextColor);
    }
    & .cancel {
      color: var(--siteColor);
    }
  }
}
</style>


