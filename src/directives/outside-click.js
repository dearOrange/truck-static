/* eslint-disable no-unused-vars */
import { isFunction } from 'lodash'

let nodeList = []
let speed = 0
const symbol = '@@outsideclick'

if (process.browser) {
  document.addEventListener(
    'click',
    event => {
      nodeList.forEach(node => node[symbol].documentHandler(event))
    },
    false
  )
}
function createClickHandle(elem, binding, vNode) {
  return function(event) {
    if (event.target === elem || elem.contains(event.target)) {
      return
    }

    if (isFunction(binding.value)) {
      binding.value()
    }
  }
}

export default {
  bind(elem, binding, vNode) {
    nodeList.push(elem)
    let id = ++speed
    elem[symbol] = {
      id,
      documentHandler: createClickHandle(elem, binding, vNode)
    }
  },

  unbind(el) {
    let len = nodeList.length
    for (let i = 0; i < len; i++) {
      if (nodeList[i][symbol].id === el[symbol].id) {
        nodeList.splice(i, 1)
        break
      }
    }
    delete el[symbol]
  }
}
