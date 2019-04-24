/* eslint-disable no-console */

const express = require('express')
var LRU = require('lru-cache')
var proxy = require('http-proxy-middleware')

const renderer = require('./utils/renderer')
const staticFiles = require('./utils/static')
const devConfig = require('./utils/devConfig')
const Config = require('./config')

const app = express()
const lru = new LRU({
  max: 500,
  maxAge: 60 * 60 * 1000
})

app.use(
  '/api/*',
  proxy({
    target: 'http://192.168.1.173:8080',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  })
)
devConfig(app)
staticFiles(app)

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  const context = {
    title: '仓货车平台PC版',
    url: req.url
  }
  let url = req.url
  let content = lru.get(url)

  if (content) {
    res.status(200)
    res.send(content)
  } else {
    renderer.renderToString(context, (err, html) => {
      // console.log(`请求地址: ${req.url}`)
      if (err) {
        // console.log(`请求地址: ${req.url}, 错误信息: ${err}`)
        if (err.url) {
          res.redirect('/404')
        } else {
          // Render Error Page or Redirect
          res.status(500).end('500 | Internal Server Error')
          console.error(`error during render : ${req.url}`)
          console.error(err.stack)
        }
      } else {
        lru.set(url, html)

        res.status(context.HTTPStatus || 200)
        res.send(html)
      }
    })
  }
})

app.listen(Config.PORT, () => {
  console.log(`server started at http://${Config.HOST}:${Config.PORT}`)
})

module.exports = app
