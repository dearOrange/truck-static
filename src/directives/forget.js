import Dialog from '@components/common/dialog'
import AuthForget from '@components/auth/forget.vue'

import eventDirectiveFactory from '@utils/event-directive'

export default eventDirectiveFactory('click', function() {
  Dialog.open(AuthForget, {
    on: {
      completed(dialogIns, result) {
        dialogIns.hide()
        if (result) {
          Dialog.success('找回密码成功')
        } else {
          Dialog.error('找回密码失败')
        }
      }
    }
  })
})
