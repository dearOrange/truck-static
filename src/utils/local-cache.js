let cache = localStorage

const PREFIX = 'COOLLINK_CACHE__'

function genKey(key) {
  return `${PREFIX}${key}`
}

export function get(key) {
  return cache.getItem(genKey(key))
}
export function set(key, value) {
  cache.setItem(genKey(key), JSON.stringify(value))
}
export function remove(key) {
  cache.removeItem(genKey(key))
}
export function clear() {
  cache.clear()
}
