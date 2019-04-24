<template>
  <div class="avatar" :style="avatarStyle">
    <img v-if="avatarUrl" :src="avatarUrl" alt="头像">
    <svg v-else class="icon close-icon" aria-hidden="true">
      <use v-bind:xlink:href="'#icon-yonghuzhongxin'"></use>
    </svg>
  </div>
</template>

<script>
import config from '@/config'

export default {
  name: 'Avatar',
  props: {
    size: {
      type: Number,
      default: 128
    },
    color: {
      type: String,
      default: config.theme.color
    },
    url: {
      type: String
    }
  },
  computed: {
    avatarStyle() {
      let realAvatarStyle = {
        padding: '4px',
        'background-color': '#dedede'
      }

      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        background: this.avatarUrl ? 'none' : this.color,
        ...(this.avatarUrl ? realAvatarStyle : {})
      }
    },
    avatarUrl() {
      return this.url
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  > svg {
    width: 80%;
    height: 80%;
    color: #fff;
  }
}
</style>

