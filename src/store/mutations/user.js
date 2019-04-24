import { SAVE_USER, UPDATE_USER, CLEAR_USER } from '@/store/types'

export default {
  [SAVE_USER](state, payload = {}) {
    state.user = { ...payload }
  },
  [UPDATE_USER](state, payload = {}) {
    state.user = { ...state.user, ...payload }
  },
  [CLEAR_USER](state) {
    state.user = {}
  }
}
