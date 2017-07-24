import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import {assert, isNil} from './util'
import Logger from 'log4js-helper'

function _validateKey(key) {
  assert(!isNil(key), '[LocalStorage] require key')
  assert(isString(key), '[LocalStorage] key must be a string')
}

export function setItem(key, value, expire) {
  _validateKey(key)
  isNil(value) && Logger.warn('[LocalStorage] value is null or undefined')
  const _expire = expire || 0
  assert(isNumber(_expire), '[LocalStorage] expire must be a number')

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
    Logger.warn('[LocalStorage] store value can\'t be parsed')
  }
  const {value, expireTime} = jsonValue
  if (isNil(expireTime) || expireTime >= Date.now()) {
    return value
  } else {
    Logger.debug(`remove expire value, key is ${key}`)
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
