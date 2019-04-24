import Vue from 'vue'

import VeeValidate, { Validator } from 'vee-validate'
import validationMessage from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate, {
  events: 'change',
  errorBagName: 'coolLinkFieldErrors',
  fieldsBagName: 'coolLinkFieldBags'
})

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
        ruleAndMessage: context(key)
      }
    })
}

let rules = require.context('@/rules', false, /\.js$/)

let customMessages = {}
requireAll(rules).forEach(
  ({ name, ruleAndMessage: { default: ruleAndMessage } }) => {
    Validator.extend(name, ruleAndMessage.rule)
    customMessages[name] = ruleAndMessage.message
  }
)

Validator.localize('zh_CN', {
  name: 'zh_CN',
  attributes: {},
  messages: {
    ...validationMessage.messages,
    required: field => `${field}不能为空！`,
    confirmed: (field, [confirmedField]) => `${field}和${confirmedField}不匹配`,
    ...customMessages
  }
})
