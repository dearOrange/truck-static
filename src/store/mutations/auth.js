import { SAVE_AUTH, UPDATE_AUTH, UPDATE_AUTH_ROUTE } from '@/store/types'

export default {
  [SAVE_AUTH](state, payload = {}) {
    state.auth = { ...payload }
  },
  [UPDATE_AUTH](state, payload = {}) {
    state.auth = { ...state.auth, ...payload }
  },
  [UPDATE_AUTH_ROUTE](state, payload = {}) {
    state.auth = { ...state.auth, route: payload }
  }
}
