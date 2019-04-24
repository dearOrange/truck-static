import { LOGIN, LOGOUT, CLEAR_USER, GET_USER_INFO } from '@/store/types'

import AuthApi from '@api/auth'

export default {
  async [LOGIN]({ dispatch }, loginInfo = {}) {
    let loginResponse
    let type = loginInfo.type
    delete loginInfo.type
    let { success } = (loginResponse = await AuthApi[
      type === 'phone' ? 'loginByPhone' : 'login'
    ](loginInfo))
    if (success) {
      dispatch(GET_USER_INFO)
    }
    return loginResponse
  },

  async [LOGOUT]({ commit }) {
    let logoutResponse
    let { success } = (logoutResponse = await AuthApi.logout())
    if (success) {
      commit(CLEAR_USER)
    }
    return logoutResponse
  }
}
