import { isPhone } from '@utils/is'

export default {
  rule: {
    validate: isPhone
  },
  message: () => `手机格式不正确`
}
