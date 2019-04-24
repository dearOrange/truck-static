import { POST } from '@/api'

export function addFollow(params = {}) {
  return POST('ptUserFollow/savePtUserFollow.do', params)
}
