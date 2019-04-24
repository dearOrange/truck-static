import { POST } from '@/api'

function login(params = {}) {
  return POST('login/validate.do', params)
}

function loginByPhone(params = {}) {
  return POST('login/validateByMobile.do', params)
}

function logout(params = {}) {
  return POST('login/logout.do', params)
}

function sendVCode(mobileNumber, type) {
  return POST('login/getVerificationCode.do', {
    mobileNumber,
    type
  })
}

function regist(params = {}) {
  return POST('login/registered.do', params)
}

function retrieve(params = {}) {
  return POST('login/retrievePass.do', params)
}

function qrcodeCheck(params = {}) {
  return POST('login/qrcodeCheck.do', params)
}

function bindWx(params = {}) {
  return POST('login/bindingWechat.do', params)
}

export default {
  login,
  loginByPhone,
  logout,
  sendVCode,
  regist,
  retrieve,
  qrcodeCheck,
  bindWx
}
