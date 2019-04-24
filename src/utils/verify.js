function isTelphone(phone) {
  //手机号正则
  let vphone = /^1[3|4|5|6|7|8][0-9]{9}$/
  return vphone.test(phone)
}

function isFixphone(value) {
  //固定电话或者手机号正则
  //   let length = phone.length
  //   let mobile1 = /^1[3|4|5|6|7|8][0-9]{9}$/
  let mobile2 = /^([0-9]{3,4}-)?[0-9]{7,8}$/
  let mobile3 = /^400-[0-9]{3}-[0-9]{4}$/
  return (
    // (length === 11 && mobile1.test(phone)) ||
    mobile2.test(value) || mobile3.test(value)
  )
}

function isNumber(value) {
  //数字正则
  let regx = /^([1-9][\d]{0,8})$/
  return regx.test(value)
}

function isTemper(value) {
  //温度正则
  let regx = /^(-?\d{0,2})(\.\d{0,2})?/
  return regx.test(value)
}
export { isTelphone, isFixphone, isNumber, isTemper }
