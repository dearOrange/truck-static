var et = require('element-theme')

// watch mode
et.watch({
  out: 'src/themes'
})

// build
et.run({
  out: 'src/themes',
  minimize: false
})

et.init()
