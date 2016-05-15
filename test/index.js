'use strict'
require('brisky-core').prototype.inject(require('../'))

const test = require('tape')
const render = require('brisky-core/render')

// note: html-element handles attributes a bit weird (https://github.com/1N50MN14/html-element/issues/23)
test('static attributes', function (t) {
  var elem, attr1, attr2
  t.plan(2)

  elem = render({
    props: {
      someattribute: true
    }
  })

  attr1 = elem.getAttribute('someattribute')

  t.ok(attr1 === 'true' || attr1.value === true, 'simple attribute')

  elem = render({
    props: {
      someattribute: false,
      anotherattribute: true
    }
  })

  attr1 = elem.getAttribute('someattribute')
  attr2 = elem.getAttribute('anotherattribute')

  t.ok(
    (attr1 === 'false' || attr1.value === '') &&
    (attr2 === 'true' || attr2.value === true)
    , 'multiple attributes')
})

test('state driven attributes', function (t) {
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

  t.ok(attr1 === 'foo' || attr1.value === 'foo', 'simple attribute')

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

  t.ok(
    (attr1 === 'foo' || attr1.value === 'foo') &&
    (attr2 === 'bar' || attr2.value === 'bar')
    , 'multiple attributes')

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

  t.ok(
    (attr1 === 'foo' || attr1.value === 'foo') &&
    (attr2 === 'bar' || attr2.value === 'bar')
    , 'mixed state and static attributes')
})