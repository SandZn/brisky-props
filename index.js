'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')
const props = require('brisky-core/lib/render/static').property

exports.properties = {
  props: {
    type: 'property',
    render: {
      static: props,
      state (target, state, type, stamp, subs, tree, id, pid) {
        const pnode = getParent(type, stamp, subs, tree, pid)
        if (pnode && !pnode._propsStaticParsed) {
          props(target, pnode)
          pnode._propsStaticParsed = true
        }
      }
    },
    child: {
      properties: { name: true },
      render: {
        static (target, pnode) {
          const val = target.compute()
          if (val === target) {
            pnode.removeAttribute(target.name || target.key)
          } else {
            pnode.setAttribute(target.name || target.key, val)
          }
        },
        state (target, state, type, stamp, subs, tree, id, pid) {
          const pnode = getParent(type, stamp, subs, tree, pid)
          if (type === 'remove') {
            if (pnode) {
              pnode.removeAttribute(target.name || target.key)
            }
          } else {
            const val = target.compute(state)
            if (val === target) {
              pnode.removeAttribute(target.name || target.key)
            } else {
              pnode.setAttribute(target.name || target.key, val)
            }
          }
        }
      }
    },
    properties: {
      type: null,
      value: {
        render: {
          static (target, pnode) {
            const val = target.compute()
            pnode.value = val
          },
          state (target, state, type, stamp, subs, tree, id, pid) {
            const pnode = getParent(type, stamp, subs, tree, pid)
            if (type === 'remove') {
              if (pnode) { pnode.value = '' }
            } else {
              const val = target.compute(state)
              if (val !== pnode.value) {
                console.log('wawa', val, pnode.value)
                pnode.value = val === target ? '' : val
              }
            }
          }
        }
      }
    }
  }
}
