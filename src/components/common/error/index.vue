<template>
  <div class="error" :style="{
    minHeight: minHeight + 'px'
  }">
    <div class="error--icon">
      <img :src="errorIcon" alt="错误图标">
    </div>
    <div class="error--msg">
      <p>{{message}}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    minHeight: {
      type: String | Number,
      default: 400
    }
  },

  computed: {
    errorIcon() {
      return require(`@/assets/img/error/${this.type}.jpg`)
    }
  }
}
</script>

<style lang="postcss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error--msg {
  margin-top: 30px;
  font-size: 20px;
  text-align: center;
}
</style>

