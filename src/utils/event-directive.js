import { logger } from '@utils'
let log = logger.getLogger('router')

let cache = {}
let count = 0
let prefix = '$$event_directive_'
let elemUidKey = `${prefix}elem_uid`

function getElemUid(elem) {
  return elem[elemUidKey]
}

function setElemUid(elem, uid) {
  return (elem[elemUidKey] = uid)
}

function getUid() {
  return `${prefix}${++count}`
}
function setCache(key, value) {
  cache[key] = value
}
function getCache(key) {
  return cache[key]
}
function init({ elem, binding, handle, vNode }) {
  let uid = getElemUid(elem)

  let directiveHandle = function(event) {
    event.preventDefault()
    handle({ elem, binding, vNode })
  }

  if (!uid) {
    uid = getUid()
    setElemUid(elem, uid)
    setCache(uid, directiveHandle)
  }
}

export default function factory(eventType, handle) {
  return {
    bind(elem, binding, vNode) {
      init({
        elem,
        binding,
        handle,
        vNode
      })
    },
    inserted(elem, binding, vNode) {
      init({
        elem,
        binding,
        handle,
        vNode
      })
      let uid = getElemUid(elem)
      // log.debug(`创建指令UID ${uid}`)
      elem.addEventListener(eventType, getCache(uid), false)
    },

    unbind(elem) {
      let uid = getElemUid(elem)
      // log.debug(`注销指令UID ${uid}`)
      elem.removeEventListener(eventType, getCache(uid), false)
    }
  }
}
