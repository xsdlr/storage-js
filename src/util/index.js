export function assert(condition, msg) {
  if (!condition) throw new Error(`${msg}`)
}

export function isNil(value) {
  return value == null
}
