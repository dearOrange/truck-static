<template>
  <div class="tab-panel">
    <div v-if="show"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabPanel',

  data() {
    return {
      show: false
    }
  },
  props: {
    label: {
      type: String,
      required: true
    }
  },

  methods: {
    unload() {
      this.show = false
    },
    load() {
      this.show = true
    }
  },

  created() {
    // this.parent = this.$parent
    // console.log(this.$parent.tabPanelList)
    // this.parent.addItem(this)
  }
}
</script>

<style lang="postcss" scoped>
</style>


