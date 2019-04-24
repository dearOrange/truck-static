import { isPassword } from '@utils/is'

export default {
  rule: {
    validate: isPassword
  },
  message: () => `密码格式至少8位，且含一个字母`
}
