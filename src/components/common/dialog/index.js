import Vue from 'vue'

import store from '@store'
import router from '@/router'
import DialogVue from './dialog.vue'

// import config from '@/config'

let DialogConstructor = Vue.extend(DialogVue)
let prevDialog = null
let defaultOptions = {
  closeable: false
}

function createDialog() {
  let instance = new DialogConstructor({
    store,
    router,
    el: document.createElement('div')
  })

  prevDialog = instance

  let oldHide = instance.hide

  instance.hide = function() {
    oldHide()
    instance.$destroy()
    document.body.removeChild(instance.$el)
    prevDialog = null
  }.bind(instance)

  return {
    instance
  }
}

export default {
  open(content, options = { on: {} }) {
    if (prevDialog) {
      prevDialog.hide()
    }

    let callback
    let promise = new Promise(reslove => {
      callback = result => {
        reslove(result)
      }
    })

    let { instance } = createDialog()

    Object.keys(options).forEach(key => {
      if (instance.hasOwnProperty(key)) {
        instance[key] = options[key]
      }
    })

    if (typeof content === 'string') {
      instance.message = content
      delete instance.$slots.default
    } else {
      let h = instance.$createElement

      let eventHandles = Object.keys(options.on || {}).reduce((acc, key) => {
        let oEventHandle = options.on[key]
        acc[key] = function(...args) {
          return oEventHandle(instance, ...args)
        }
        return acc
      }, {})

      instance.$slots.default = [
        h(content, {
          on: {
            close: value => {
              callback && callback(value)
              instance.hide()
              callback = null
            },
            ...eventHandles
          },
          props: {
            ...options.props
          }
        })
      ]
    }

    document.body.appendChild(instance.$el)

    Vue.nextTick(() => {
      instance.show(content)
    })

    return promise
  },

  alert(content, options) {
    return this.open(content, {
      ...defaultOptions,
      type: 'alert',
      ...options
    })
  },

  success(content, options = {}) {
    return this.alert(content, {
      icon: 'chenggong',
      iconColor: '#fff',
      autoClose: 1000,
      ...options
    })
  },

  error(content, options = {}) {
    return this.alert(content, {
      icon: 'shibai',
      // iconColor: config.theme.errorColor,
      iconColor: '#fff',
      autoClose: 1000,
      ...options
    })
  },

  confirm(content, options = {}) {
    return this.open(content, {
      ...defaultOptions,
      type: 'confirm',
      closeable: true,
      ...options
    })
  }
}
