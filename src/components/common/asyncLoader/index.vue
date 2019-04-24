<template>
  <div>
    <inner-loader class="inner" :render="render" :status="status"></inner-loader>
  </div>
</template>

<script>
import Loader, { LOADER_STATUS } from './loader'

export default {
  name: 'AsyncLoader',
  components: {
    InnerLoader: Loader
  },
  props: {
    loader: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      data: null,
      status: LOADER_STATUS.UNSTART
    }
  },

  methods: {
    render() {
      return this.$scopedSlots.default(this.data)
    },

    async fetch() {
      this.status = LOADER_STATUS.LOADING
      let { success, data } = await this.loader()
      if (success) {
        this.data = data
        this.status = LOADER_STATUS.SUCCESS
      } else {
        this.status = LOADER_STATUS.ERROR
      }
    },
    init() {
      this.fetch()
    }
  },

  mounted() {
    this.init()
  }
}
</script>
