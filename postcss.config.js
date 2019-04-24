/* eslint-disable no-unused-vars */

const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')
const postcssUrl = require('postcss-url')

const postcssCssnext = require('postcss-cssnext')
const postcssApply = require('postcss-apply')
const postcssPropertyLookup = require('postcss-property-lookup')

let vars = require('./config/theme/postcss.vars.js')
module.exports = {
  plugins: [
    postcssImport({
      path: ['src/assets/postcss']
    }),
    postcssUrl({}),
    postcssPresetEnv({
      stage: 2,
      features: {
        'nesting-rules': true,
        'property-lookup': true,
        'color-mod-function': true,
        apply: true
      },

      insertBefore: {
        apply: postcssApply,
        'property-lookup': postcssPropertyLookup
      },

      preserve: false,
      importFrom: [
        './src/assets/postcss/global.postcss',
        {
          customProperties: {
            ...vars
          }
        }
      ]
    })
  ]
}
