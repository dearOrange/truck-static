import { cloneRoute } from '@utils'
import Dialog from '@components/common/dialog'
import AuthLogin from '@components/auth/login.vue'

import eventDirectiveFactory from '@utils/event-directive'

function openAuth(router) {
  Dialog.open(AuthLogin, {
    on: {
      completed(dialogIns, result) {
        dialogIns.hide()
        if (result === true) {
          router.replace({
            name: 'authing',
            params: {
              to: cloneRoute(router.currentRoute),
              text: '正在登录, 请稍后...'
            }
          })
        } else if (result === false) {
          Dialog.error('登录失败!')
        }
      }
    }
  })
}

export default {
  install: function(Vue) {
    Vue.directive(
      'auth',
      eventDirectiveFactory('click', function({ vNode }) {
        let context = vNode.context
        openAuth(context.$router)
      })
    )
  }
}
