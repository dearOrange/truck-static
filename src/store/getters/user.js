import { dephone } from '@utils/desensitive'

export default {
  getUser({ user }) {
    return user
  },
  getName({ user: { mobileNumber, userName } }) {
    if (mobileNumber) {
      return dephone(mobileNumber)
    } else {
      return userName
    }
  },
  getUserId({ user: { userId = '' } }) {
    return userId
  },
  getIp({ user: { ip } }) {
    return ip
  },
  getCity({ user: { city = '北京市' } }) {
    return city
  },
  getCityCode({ user: { cityCode = '110100' } }) {
    return cityCode
  },
  getCityArea({ user: { city = '', area = '' } }) {
    return `${city}${area}`
  }
}
