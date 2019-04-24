<template>
  <div class="my-box">
    <my-label class="box--hd" :text="title"/>
    <div class="box--bd">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import MyLabel from '@components/my/label.vue'

export default {
  name: 'MyBox',
  props: {
    title: {
      type: String,
      require: true
    }
  },
  components: {
    MyLabel
  }
}
</script>

<style lang="postcss" scoped>
.my-box {
  padding: 30px 30px 70px 30px;
  background: #fff;
}

.box--bd {
  margin-top: 30px;
}
</style>

