<template>
  <div class="search">
    <div class="search--wrap">
      <slot name="assist" :supplement="{
        hide: hideSupplement
      }"></slot>
      <div class="search--box">
        <div class="search-container">
          <div class="search--input-wrap">
            <div class="search--input">
              <input
                type="text"
                v-model="inputValue"
                :placeholder="placeholderText"
                @focus="showSupplement"
                :style="inputBoxStyle"
              >
              <span v-if="isInputed" class="search--input--close" @click="clear">&times;</span>
            </div>
            <!-- <a class="search--btn search--btn__query">搜索</a> -->
            <cool-link-button
              themes="primary"
              class="search--btn__query"
              size="large"
              @click="doSearch"
            >搜索</cool-link-button>
          </div>

          <cool-link-button
            v-if="sideButton"
            themes="primary"
            class="search--btn__action"
            size="large"
            @click="sideButton.action"
          >{{sideButton.text}}</cool-link-button>
          <!-- <a v-if="sideButton" class="search--btn search--btn__action" @click="sideButton.action">{{sideButton.text}}</a> -->
        </div>
        <div class="search--supplement" v-show="isShowSupplement">
          <slot name="supplement" :supplement="{
            hide: hideSupplement
          }"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isBoolean } from 'lodash'

export default {
  name: 'Search',
  props: {
    sideButton: {
      type: Object
    },
    placeholder: {
      type: String,
      default: '请输入关键字'
    },
    border: {
      type: Boolean | String,
      default: false
    },
    initValue: {
      type: String,
      default: ''
    },

    searchKeys: {
      type: Array
    }
  },

  data() {
    return {
      inputValue: this.initValue,
      isShowSupplement: false
    }
  },

  computed: {
    isInputed() {
      return this.inputValue !== ''
    },
    inputBoxStyle() {
      let border = this.border
      let borderStyle = {
        'border-width': '1px 0 1px 1px',
        'border-style': 'solid',
        'border-color': isBoolean(border) ? '#d4d4d4' : border
      }

      return {
        ...(border ? borderStyle : {})
      }
    },

    placeholderText() {
      let defaultText = this.placeholder
      let text = defaultText
      if (this.hasSeachKeys) {
        text = this.searchKeys
          .map(item => {
            return `[${item.label}]`
          })
          .join('')

        text = `在${text}条件下搜索`
      }
      return text
    },

    hasSeachKeys() {
      return this.searchKeys && this.searchKeys.length
    }
  },

  methods: {
    // 清空输入内容
    clear() {
      this.inputValue = ''
    },

    showSupplement() {
      this.isShowSupplement = true
    },
    hideSupplement() {
      this.isShowSupplement = false
    },

    doSearch() {
      this.$emit(
        'search',
        this.inputValue,
        this.hasSeachKeys ? [...this.searchKeys] : []
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
.search {
  /* display: flex; */
  /* justify-content: center; */
}
.search--box {
  position: relative;
  height: 56px;
}
.search-container {
  display: flex;
  justify-content: space-between;
}
.search--input-wrap {
  display: flex;
  flex: 1 auto;
}

.search--input {
  position: relative;
  height: 56px;
  flex: 1 auto;
  & > input {
    height: 56px;
    border: 0;
    outline: 0;
    padding-left: 20px;
    padding-right: 40px;
    width: 100%;
    background: #fff;
  }
}
.search--input--close {
  width: 21px;
  height: 21px;
  position: absolute;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  right: 10px;
  top: 18px;
}

.search--btn {
  display: inline-block;
  width: 127px;
  height: 56px;
  background: var(--siteColor);
  text-align: center;
  line-height: 56px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}

.search--btn__action {
  margin-left: 10px;
}

.search--supplement {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: var(--zIndex9);
  width: 100%;
}
</style>
