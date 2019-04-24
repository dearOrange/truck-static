'use strict'

const path = require('path')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('lodash/merge')

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'

const assetRoot = 'assets'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  assetsDir: assetRoot,

  configureWebpack: () => ({
    entry: `./src/entry-${target}`,
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    plugins: [
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
    ],
    externals: TARGET_NODE
      ? nodeExternals({
          whitelist: [/\.css$/]
        })
      : undefined,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    optimization: {
      splitChunks: undefined
    },
    resolve: {
      alias: {
        '@pages': resolve('src/pages'),
        '@utils': resolve('src/utils'),
        '@components': resolve('src/components'),
        '@api': resolve('src/api'),
        '@store': resolve('src/store'),
        '@config': resolve('src/config'),
        '@mixins': resolve('src/mixins')
      }
    }
  }),
  chainWebpack: config => {
    if (TARGET_NODE) {
      let langs = ['css', 'postcss', 'less']
      let ones = ['vue', 'normal', 'vue-modules', 'normal-modules']
      langs.forEach(lang => {
        ones.forEach(one => {
          let target = config.module.rule(lang).oneOf(one)
          target.uses.delete('extract-css-loader')
          target.use('css-loader').loader('css-loader/locals')
        })
      })
    } else {
      config.plugin('define').tap(([defintion]) => {
        return [
          {
            ...defintion,
            'process.browser': true
          }
        ]
      })
    }

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .merge({
        options: {
          name: `${assetRoot}/img/[name].[hash:8].[ext]`
        }
      })

    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .merge({
        options: {
          name: `${assetRoot}/fonts/[name].[hash:8].[ext]`
        }
      })

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options =>
        merge(options, {
          optimizeSSR: false
        })
      )
    config.plugins
      .delete('split-vendor')
      .delete('split-vendor-async')
      .delete('split-manifest')
      .delete('inline-manifest')
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.173:8080',
        changeOrigin: true,

        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
