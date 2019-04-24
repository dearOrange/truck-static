export const LOADER_STATUS = {
  UNSTART: 1 << 1,
  LOADING: 1 << 3,
  ERROR: 1 << 4,
  SUCCESS: 1 << 5,
  DONE: 1 << 10
}

function isLoading(status) {
  return LOADER_STATUS.LOADING & status
}
function isSuccess(status) {
  return LOADER_STATUS.SUCCESS & status
}
function isError(status) {
  return LOADER_STATUS.SUCCESS & status
}

export default {
  render(h) {
    let content
    if (isLoading(this.status)) {
      content = '正在加载中'
    } else if (isSuccess(this.status)) {
      content = this.render()
    } else if (isError(this.status)) {
      content = '加载失败'
    }

    return h('div', content)
  },
  props: {
    render: {
      type: Function,
      required: true
    },
    status: {
      type: Number,
      required: true
    }
  }
}
