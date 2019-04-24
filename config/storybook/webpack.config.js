const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = storybookBaseConfig => {
  Object.assign(storybookBaseConfig.resolve.alias, {
    '@': resolve('src'),
    '@components': resolve('src/components'),
    '@utils': resolve('src/utils')
  })
  // console.log(storybookBaseConfig)

  return storybookBaseConfig
}
