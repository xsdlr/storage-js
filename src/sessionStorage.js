import isString from 'lodash-es/isString'
import {assert, isNil} from './util'
import Logger from 'logger-js'

function _validateKey(key) {
  assert(!isNil(key), '[SessionStorage] key不能为空')
  assert(isString(key), '[SessionStorage] key必须为string')
}

export function setItem(key, value) {
  _validateKey(key)
  isNil(value) && Logger.warn('[SessionStorage] value为null或undefined')

  const storeValue = {
    value
  }
  Logger.debug('[SessionStorage] save', `key: ${key}`, storeValue)
  sessionStorage.setItem(key, JSON.stringify(storeValue))
}

export function getItem(key) {
  _validateKey(key)
  const storageString = sessionStorage.getItem(key) || '{}'
  let jsonValue = {}
  try {
    jsonValue = JSON.parse(storageString)
  } catch (e) {
    Logger.warn('[SessionStorage] 存储的值无法解析')
  }
  const {value} = jsonValue
  return value
}

export function removeItem(key) {
  _validateKey(key)
  sessionStorage.removeItem(key)
}

export function clear() {
  sessionStorage.clear()
}

export default {
  setItem,
  getItem,
  removeItem,
  clear
}
