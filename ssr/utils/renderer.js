const fs = require('fs')
const path = require('path')

const { createBundleRenderer } = require('vue-server-renderer')

const template = fs.readFileSync(
  path.resolve(__dirname, '../template.html'),
  'utf-8'
)
const bundle = require(path.resolve(
  __dirname,
  '../../dist/vue-ssr-server-bundle.json'
))
const clientManifest = require(path.resolve(
  __dirname,
  '../../dist/vue-ssr-client-manifest.json'
))

function createRenderer(bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      runInNewContext: false
    })
  )
}

Object.keys(clientManifest.modules).forEach(key => {
  let ids = clientManifest.modules[key]
  clientManifest.modules[key] = ids.filter(id => {
    return id !== -1
  })
})

const renderer = createRenderer(bundle, {
  template,
  clientManifest
})

module.exports = renderer
