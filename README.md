# brisky-props
<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/brisky-props.svg?branch=master)](https://travis-ci.org/vigour-io/brisky-props)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/brisky-props.svg)](https://badge.fury.io/js/brisky-props)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/brisky-props/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/brisky-props?branch=master)

<!-- VDOC END -->
Set attributes on brisky-elements

```javascript
  const render = require('brisky/render')
  const s = require('vigour-state/s')
  const state = s({ thumb: 'cat' })

  const app = render({
    img: {
      tag: 'img',
      props: {
        src: {
          $: 'thumb',
          $transform: (val) => `http://bla.com/${val}.jpg`
        }
      }
    }
  }, state)

  document.body.appendChild(app)

  state.cat.thumb('dog') // → changes thumb to dog
```