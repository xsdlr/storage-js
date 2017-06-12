import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import {assert, isNil} from './util'
import Logger from 'logger-js'

function _validateKey(key) {
  assert(!isNil(key), '[LocalStorage] key不能为空')
  assert(isString(key), '[LocalStorage] key必须为string')
}

export function setItem(key, value, expire) {
  _validateKey(key)
  isNil(value) && Logger.warn('[LocalStorage] value为null或undefined')
  const _expire = expire || 0
  assert(isNumber(_expire), '[LocalStorage] expire必须是number')

  const storeValue = {
    value,
    expireTime: _expire > 0 ? Date.now() + _expire : null
  }
  Logger.debug('[LocalStorage] save', `key: ${key}`, storeValue)
  localStorage.setItem(key, JSON.stringify(storeValue))
}

export function getItem(key) {
  _validateKey(key)
  const localStorageString = localStorage.getItem(key) || '{}'
  let jsonValue = {}
  try {
    jsonValue = JSON.parse(localStorageString)
  } catch (e) {
    Logger.warn('[LocalStorage] 存储的值无法解析')
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
