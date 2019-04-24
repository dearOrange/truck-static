<template>
  <div class="text-value">
    <div class="text">{{text}}</div>
    <div class="value">
      <template v-if="value">
        <div class="value--images" v-if="isImage">
          <template v-if="isListValue">
            <img class="image" v-for="(item, index) in value" :key="index" :src="item" alt="图片">
          </template>
        </div>
        <template v-else>
          <template v-if="isListValue">
            <template v-for="(item, index) in value">
              <span :key="index">{{item}}</span>
            </template>
          </template>
          <span v-else>{{value}}</span>
        </template>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </div>
  </div>
</template>

<script>
import { isArray, isString, toLower } from 'lodash'

export default {
  name: 'TextValue',
  props: {
    text: {
      type: String
    },
    value: {
      type: String | Number | Array
    },

    isImage: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isListValue() {
      return isArray(this.value)
    }
  }
}
</script>

<style lang="postcss" scoped>
.text-value {
  display: flex;
  & .value {
    flex: 1 auto;
  }
  & .text {
    width: 5em;
    flex-shrink: 0;
    color: var(--siteTextLightColor);
  }
  & .sep {
    margin: 0 3px;
  }
}
.value--images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & .image {
    display: block;
    width: 280px;
    height: 200px;
    &:nth-child(n + 3) {
      margin-top: 20px;
    }
  }
}
</style>