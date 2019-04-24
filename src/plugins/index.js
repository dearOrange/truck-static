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
        plugin: context(key)
      }
    })
}

let plugins = require.context('@/plugins', false, /\.js$/)

requireAll(plugins).forEach(({ plugin: { default: plugin } }) => {
  Vue.use(plugin)
})
