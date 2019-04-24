import { isPhone } from '@utils/is'

export default {
  rule: {
    validate(value) {
      return true || isPhone(value)
    }
  },
  message: () => `账号格式不正确`
}
