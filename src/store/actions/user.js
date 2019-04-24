/* eslint-disable no-debugger */
import {
  SAVE_USER,
  UPDATE_USER,
  GET_USER_INFO,
  SET_USER_GEO,
  SET_USER_LOCATION
} from '@/store/types'

import UserApi from '@api/user'
import { sleep } from '@utils'

export default {
  async [GET_USER_INFO]({ commit }) {
    let userResponse
    let {
      success,
      data: userInfo
    } = (userResponse = await UserApi.getUserInfo())
    if (success) {
      commit(SAVE_USER, userInfo)
    }
    return userResponse
  },

  [SET_USER_GEO]({ commit }) {
    return new Promise(resolve => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(location => {
          let { longitude: lng, latitude: lat } = location.coords
          let geo = { lng, lat }
          // TODO 根据经纬度 获取 城市信息
          commit(UPDATE_USER, { geo })
          resolve(geo)
          sleep(300).then(() => {
            resolve(geo)
          })
        })
      }
    })
  },

  async [SET_USER_LOCATION]({ commit }, localInfo = {}) {
    let { areaId: cityCode, areaName: city } = localInfo
    let locationResponse
    if (cityCode) {
      let { success } = (locationResponse = await UserApi.changeLocationCity(
        cityCode
      ))
      if (success) {
        commit(UPDATE_USER, { cityCode, city })
      }
    } else {
      locationResponse = { success: false }
    }
    return locationResponse
  }
}
