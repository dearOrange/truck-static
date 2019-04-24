import Dialog from '@components/common/dialog'
import AuthRebind from '@components/auth/rebind.vue'

import eventDirectiveFactory from '@utils/event-directive'

export default eventDirectiveFactory('click', function() {
  Dialog.open(AuthRebind, {
    on: {
      completed(dialogIns, result) {
        dialogIns.hide()
        if (result) {
          Dialog.success('更换成功')
        } else {
          Dialog.error('更换失败')
        }
      }
    }
  })
})
