'use strict'

let config = require('./config.json')

let theme = {
  ...config,
  primaryColor: config.siteColor
}

module.exports = {
  ...Object.keys(theme).reduce((acc, key) => {
    acc[`--${key}`] = theme[key]
    return acc
  }, {})
}
