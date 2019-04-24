const express = require('express')
const path = require('path')
const staticDirs = ['js', 'css', 'img', 'fonts']

function staticFiles(app) {
  staticDirs.forEach(dir => {
    app.use(
      `/assets/${dir}`,
      express.static(path.resolve(__dirname, `../../dist/assets/${dir}`))
    )
  })
  app.use(
    '/favicon.ico',
    express.static(path.resolve(__dirname, `../../dist/favicon.ico`))
  )
}

module.exports = staticFiles
