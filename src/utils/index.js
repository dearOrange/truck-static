/* eslint-disable no-unused-vars */
import { isString, isArray, split, lte, cloneDeep } from 'lodash'

export * from './logger'

export function decamelize(text) {
  if (!isString(text)) {
    throw new TypeError('Expected a string')
  }

  let rCapitalLetter = /([A-Z])([a-z0-9]*)?/g
  let separator = '-'
  return text.replace(rCapitalLetter, (oText, r1 = '', r2 = '', index) => {
    return `${index === 0 ? '' : separator}${r1.toLowerCase()}${r2}`
  })
}

export function sleep(time = 1000) {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove('醒啦')
    }, time)
  })
}

export function formatRange(range, unit, minLimit = 0, jline = '-') {
  let list = isArray(range) ? range : split(range, ',', 2)
  let min = list[0]
  let max = list[1]
  let lowest = lte(min, minLimit)
  let suffix = lowest ? '以下' : !max ? '以上' : ''
  return `${lowest ? max : min}${
    lowest ? '' : max ? jline + max : ''
  }${unit}${suffix}`
}

export function isDev() {
  return process.env.NODE_ENV === 'development'
}

export function promisify(asyncFunc) {
  return new Promise((reslove, reject) => {
    asyncFunc(data => {
      reslove(data)
    })
  })
}

export function isRefreshPage(fromRoute) {
  return !fromRoute.name
}

export function cloneRoute(route) {
  return {
    name: route.name,
    path: route.path,
    matched: [...route.matched],
    meta: { ...route.meta },
    query: { ...route.query },
    params: { ...route.params }
  }
}
