import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import isNil from 'lodash/isNil'
import {assert} from './util'
import Logger from 'logger-js'

function _validateKey(key) {
  assert(!isNil(key), '[ExpireLocalStorage] key不能为空')
  assert(isString(key), '[ExpireLocalStorage] key必须为string')
}

export function setItem(key, value, expire) {
  _validateKey(key)
  isNil(value) && Logger.warn('[ExpireLocalStorage] ', 'value为null或undefined')
  const _expire = expire || 0
  assert(isNumber(_expire), '[ExpireLocalStorage] expire必须是number')

  const storeValue = {
    value,
    expireTime: _expire > 0 ? Date.now() + _expire : null
  }
  Logger.debug(`key: ${key}`, `storeValue: ${JSON.stringify(storeValue)}`)
  localStorage.setItem(key, JSON.stringify(storeValue))
}

export function getItem(key) {
  _validateKey(key)
  const localStorageString = localStorage.getItem(key) || '{}'
  let jsonValue = {}
  try {
    jsonValue = JSON.parse(localStorageString)
  } catch (e) {
    Logger.warn('[ExpireLocalStorage] ', '存储的值无法解析')
  }
  const {value, expireTime} = jsonValue
  if (isNil(expireTime) || expireTime >= Date.now()) {
    return value
  } else {
    Logger.debug(`key为${key}的值超时删除`)
    localStorage.removeItem(key)
    return undefined
  }
}

export function removeItem(key) {
  _validateKey(key)
  localStorage.removeItem(key)
}

export function clear() {
  localStorage.clear()
}

export default {
  setItem,
  getItem,
  removeItem,
  clear
}
