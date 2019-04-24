import { SAVE_MAP_DEPOT, CLEAR_MAP_DEPOT } from '@/store/types'

export default {
  [SAVE_MAP_DEPOT](state, payload = {}) {
    state.depot = payload
  },
  [CLEAR_MAP_DEPOT](state) {
    state.depot = null
  }
}
