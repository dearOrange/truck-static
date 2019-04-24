import { POST, GET } from '@/api'

function getUserInfo(params = {}) {
  return POST('user/getLoginUser.do', params)
}

function updateUser(params = {}) {
  return POST('user/modifyInformation.do', params)
}

function updatePsd(params = {}) {
  return POST('user/changePass.do', params)
}

// 验证手机 与 验证码 是否一致
function validateMobile(mobileNumber, code) {
  return POST('user/validateByMobAndCode.do', { mobileNumber, code })
}

// 替换手机号
function replaceMobile(params) {
  return POST('user/replaceMobile.do', params)
}

function changeLocationCity(areaId) {
  return GET('user/getLoginCity.do', { areaId })
}

export default {
  getUserInfo,
  updateUser,
  updatePsd,
  validateMobile,
  replaceMobile,
  changeLocationCity
}
