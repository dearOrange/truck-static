import { isError } from 'lodash'

export default function asyncFetch(dataFetcher) {
  return {
    data() {
      return {
        page: {
          pageNum: 1,
          pageSize: 10,
          pageTotal: 0
        },
        params: {},
        loading: false,
        list: []
      }
    },
    computed: {
      isEmpty() {
        return (this.list || []).length === 0
      },
      isError() {
        return isError(this.list)
      }
    },
    methods: {
      onSearch(currency = '') {
        this.params.currency = currency
        this.next({ ...this.params })
      },

      onPageChange(pageNum) {
        this.page.pageNum = pageNum
        this.next({ ...this.params })
      },
      fetch(params) {
        return dataFetcher({
          ...params,
          ...this.page
        })
      },
      render(response) {
        response.then(
          ({ success, data, page: { total } = { total: 0 }, msg: message }) => {
            if (success) {
              this.list = data
              this.page.pageTotal = total
            } else {
              this.list = new Error(message)
            }
            this.loading = false
          }
        )
      },
      next(params) {
        this.fetch(params).then(response => {
          this.render(response)
        })
      },

      refresh() {
        this.next(this.params)
      }
    },
    created() {
      if (this.pageSize) {
        this.page.pageSize = this.pageSize
      }
    }
  }
}
