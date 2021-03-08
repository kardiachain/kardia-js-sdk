
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./kardia-js-sdk.cjs.production.min.js')
} else {
  module.exports = require('./kardia-js-sdk.cjs.development.js')
}
