<template>
  <div class="pagination" v-if="!isEmpty">
    <el-pagination
      background
      @current-change="onPageChange"
      :current-page.sync="page.pageNum"
      :page-size="page.pageSize"
      layout="pager, jumper"
      :total="page.pageTotal"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    position: {
      type: String
    },
    page: {
      type: Object,
      default() {
        return {
          pageNum: 0,
          pageSize: 0,
          pageTotal: 0
        }
      },
      required: true
    }
  },

  computed: {
    isEmpty() {
      return this.page.pageTotal === 0
    }
  },

  data() {
    return {}
  },

  methods: {
    onPageChange(pageNum) {
      window.scrollTo(0, 0)
      this.$emit('change', pageNum)
    }
  }
}
</script>

<style lang="postcss" scoped>
.pagination {
  text-align: center;
}
</style>

