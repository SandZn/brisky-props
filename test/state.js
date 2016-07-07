'use strict'
require('brisky-core').prototype.inject(require('../'))
const test = require('tape')
const render = require('brisky-core/render')
const s = require('vigour-state/s')
const p = require('parse-element')

test('state', function (t) {
  var elem, attr1, attr2
  t.plan(3)
  elem = render({
    props: {
      someattribute: {
        $: 'someValue'
      }
    }
  }, {
    someValue: 'foo'
  })
  attr1 = elem.getAttribute('someattribute')
  if (!attr1) {
    t.fail('no attribute')
  } else {
    t.ok(attr1 === 'foo' || attr1.value === 'foo', 'simple attribute')
  }
  elem = render({
    props: {
      someattribute: {
        $: 'someValue'
      },
      anotherattribute: {
        $: 'anotherValue'
      }
    }
  }, {
    someValue: 'foo',
    anotherValue: 'bar'
  })
  attr1 = elem.getAttribute('someattribute')
  attr2 = elem.getAttribute('anotherattribute')
  if (!attr1 || !attr2) {
    t.fail('no attributes')
  } else {
    t.ok(
      (attr1 === 'foo' || attr1.value === 'foo') &&
      (attr2 === 'bar' || attr2.value === 'bar')
      , 'multiple attributes')
  }

  elem = render({
    props: {
      someattribute: {
        $: 'someValue'
      },
      anotherattribute: 'bar'
    }
  }, {
    someValue: 'foo'
  })
  attr1 = elem.getAttribute('someattribute')
  attr2 = elem.getAttribute('anotherattribute')
  if (!attr1 || !attr2) {
    t.fail('no attributes')
  } else {
    t.ok(
      (attr1 === 'foo' || attr1.value === 'foo') &&
      (attr2 === 'bar' || attr2.value === 'bar')
      , 'mixed state and static attributes')
  }
})

test('state - src', function (t) {
  const state = s({
    thumb: 'cat.jpg'
  })
  const app = render({
    img: {
      tag: 'img',
      props: {
        src: {
          $: 'thumb'
        }
      }
    }
  }, state)
  var src = app.childNodes[0].getAttribute('src')
  t.equal(src.value || src, 'cat.jpg', 'initial')
  state.thumb.remove()
  src = app.childNodes[0].getAttribute('src')
  t.equal(src, void 0, 'remove thumb')
  state.set({ thumb: 'x' })
  t.equal(p(app), '<div><img src="x"></img></div>', 'type slider (type override)')
  state.set({ thumb: void 0 })
  t.equal(p(app), '<div><img></img></div>', 'type slider (type override)')
  t.end()
})

test('state - value', function (t) {
  const state = s({
    rating: '10'
  })
  const app = render({
    slider: {
      tag: 'input',
      props: {
        type: 'slider',
        value: {
          $: 'rating'
        }
      }
    }
  }, state)
  t.equal(p(app), '<div><input type="slider"></div>', 'type slider (type override)')
  t.same(app.childNodes[0].value, '10', 'has correct initial value')
  state.rating.remove()
  t.equal(app.childNodes[0].value, '', 'remove rating') // need to verify in the browser
  t.end()
})
