import Vue from 'vue'

function endWithIndexJs(str) {
  return str.endsWith('index.js')
}

function not(fn) {
  return function(arg) {
    return !fn(arg)
  }
}

const requireAll = context => {
  return context
    .keys()
    .filter(not(endWithIndexJs))
    .map(key => {
      return {
        name: key.replace(/\.?\/?(.*)\.js/g, (...args) => {
          return args[1]
        }),
        directive: context(key)
      }
    })
}

let directives = require.context('@/directives', false, /\.js$/)

requireAll(directives).forEach(
  ({ name, directive: { default: directiveItem } }) => {
    Vue.directive(name, directiveItem)
  }
)
