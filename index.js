'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')
const props = require('brisky-core/lib/render/static').property

exports.properties = {
  props: {
    type: 'property',
    properties: { type: null },
    render: {
      static: props,
      state (target, state, type, stamp, subs, tree, id, pid) {
        const pnode = getParent(type, stamp, subs, tree, pid)
        if (!pnode._propsStaticParsed) {
          props(target, pnode)
          pnode._propsStaticParsed = true
        }
      }
    },
    Child: {
      properties: {
        name: true
      },
      render: {
        static (target, pnode) {
          pnode.setAttribute(target.name || target.key, target.compute())
        },
        state (target, state, type, stamp, subs, tree, id, pid) {
          const pnode = getParent(type, stamp, subs, tree, pid)
          pnode.setAttribute(target.name || target.key, target.compute(state))
        }
      }
    }
  }
}
