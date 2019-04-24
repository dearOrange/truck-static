export function isPhone(phone) {
  let rphone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
  return rphone.test(phone)
}

export function isPassword(password) {
  let rPassword = /^(?!\d{8,16}$)[a-zA-z0-9]{8,16}$/
  return rPassword.test(password)
}
