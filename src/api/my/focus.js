import { POST, GET } from '@/api'

function deleteFollow(userFollowUkid) {
  return POST('ptUserFollow/deletePtUserFollow.do', { userFollowUkid })
}

function deleteFollows(ukids) {
  return POST('ptUserFollow/batchDelete.do', { ukids })
}

function getFollowStatistics(params) {
  return GET('ptUserFollow/getDataObject.do', params)
}

function getInvalidFollowList(params) {
  return POST('ptUserFollow/getListByInvalid.do', params)
}

function getFollowedRentedList(params) {
  return POST('ptUserFollow/getListByDemand.do', params)
}

function getFollowedRentList(params) {
  return POST('ptUserFollow/getListByRelease.do', params)
}

export default {
  deleteFollow,
  deleteFollows,
  getFollowStatistics,

  getInvalidFollowList,
  getFollowedRentedList,
  getFollowedRentList
}
