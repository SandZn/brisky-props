'use strict'
const isNode = require('vigour-util/is/node')
require('brisky-core')

if (isNode) {
  const sa = global.Element.prototype.setAttribute
  const ga = global.Element.prototype.getAttribute
  global.Element.prototype.setAttribute = function (key, val) {
    if (typeof val !== 'string') {
      val = String(val)
    }
    return sa.call(this, key, val)
  }
  global.Element.prototype.getAttribute = function (key) {
    const ret = ga.call(this, key)
    return ret ? ret.value : void 0
  }
}

require('./state')
require('./static')
