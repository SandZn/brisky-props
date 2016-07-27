'use strict'
require('brisky-core').prototype.inject(require('../'))
const test = require('tape')
const render = require('brisky-core/render')
const p = require('parse-element')
// note: html-element handles attributes a bit weird (https://github.com/1N50MN14/html-element/issues/23)

test('static', function (t) {
  var elem, attr1, attr2
  elem = render({
    props: {
      someattribute: true
    }
  })
  attr1 = elem.getAttribute('someattribute')
  t.ok(attr1 === 'true' || attr1.value === 'true', 'simple attribute')
  elem = render({
    props: {
      someattribute: false,
      anotherattribute: true
    }
  })
  attr1 = elem.getAttribute('someattribute')
  attr2 = elem.getAttribute('anotherattribute')
  t.ok(
    (attr1 === 'false' || attr1.value === 'false') &&
    (attr2 === 'true' || attr2.value === 'true')
    , 'multiple attributes')
  t.ok(!elem.getAttribute('type'), 'doesn\'t include type')
  t.end()
})

test('static - value', function (t) {
  const app = render({
    slider: {
      tag: 'input',
      props: {
        type: 'slider',
        value: '10'
      }
    }
  })
  t.equal(p(app), '<div><input type="slider"></div>', 'type slider (type override)')
  t.same(app.childNodes[0].value, '10', 'has correct value')
  t.end()
})

test('static - remove', function (t) {
  const app = render({
    types: {
      field: {
        props: {
          someattribute: true
        }
      }
    },
    field: {
      type: 'field',
      props: {
        someattribute () {
          return this
        }
      }
    }
  })
  t.equal(p(app), '<div><div></div></div>', 'remove static attribute (equals target)')
  t.end()
})
