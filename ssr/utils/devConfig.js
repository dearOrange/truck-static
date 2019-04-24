var proxy = require('http-proxy-middleware')
const Config = require('../config')

function configDev(app) {
  if (process.env.NODE_ENV !== 'production') {
    app.use(
      '/js/main*',
      proxy({
        target: `http://${Config.HOST}:${Config.PORT}`,
        changeOrigin: true,
        pathRewrite: function(path) {
          return path.includes('main') ? '/main.js' : path
        },
        prependPath: false
      })
    )

    app.use(
      '/*hot-update*',
      proxy({
        target: `http://${Config.HOST}:${Config.PORT}`,
        changeOrigin: true
      })
    )

    app.use(
      '/sockjs-node',
      proxy({
        target: `http://${Config.HOST}:${Config.PORT}`,
        changeOrigin: true,
        ws: true
      })
    )
  }
}

module.exports = configDev
