/* eslint-disable no-unused-vars */
import Dialog from '@components/common/dialog'
import AuthRegister from '@components/auth/register.vue'

import eventDirectiveFactory from '@utils/event-directive'
import { logger } from '@utils'
let log = logger.getLogger('router')

export default eventDirectiveFactory('click', function({ binding }) {
  // Dialog.error('找回密码失败', {
  //   autoClose: 0
  // })

  Dialog.open(AuthRegister, {
    on: {
      completed(dialogIns, result) {
        dialogIns.hide()
        if (result) {
          Dialog.success('注册成功')
        } else {
          Dialog.error('注册失败')
        }
      }
    }
  })
})
