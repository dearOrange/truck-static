import { POST, GET } from '@/api'

// 取消我的收藏
function cancelCollect(userViewUkid) {
  return POST('ptUserView/deletePtUserView.do', { userViewUkid })
}

// 我的足迹
function getFooterList(params) {
  return GET('ptUserView/getListByUser.do', params)
}

// 我的最近发布冷库
function getRecentDepotList(params) {
  return GET('baStock/getListByLately.do', params)
}

export default {
  cancelCollect,
  getFooterList,
  getRecentDepotList
}
