import { Message } from 'element-ui'
import { isFunction } from 'lodash'

let errorIsShown = false

let ERROR_CODE = {
  '1001': {
    message: function(data) {
      popError(data.message)
    }
  },
  '1002': {
    message: function(data) {
      popError(data.message)
    }
  },
  '400': { message: '[400]错误' },
  '404': { message: '[404]错误' },
  '500': { message: '[500]错误' }
}

function popError(msg) {
  if (errorIsShown) {
    return
  }
  errorIsShown = true
  return Message.error({
    message: `${msg}`,
    showClose: true,
    duration: 4000,
    onClose() {
      errorIsShown = false
    }
  })
}

export default function error(code, data = {}) {
  let { message } = ERROR_CODE[code] || { message: '出错了' }

  if (message) {
    if (isFunction(message)) {
      // 是函数
      return message(data)
    }
  }
}
