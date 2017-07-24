import isString from 'lodash/isString'
import {assert, isNil} from './util'
import Logger from 'log4js-helper'

function _validateKey(key) {
  assert(!isNil(key), '[SessionStorage] require key')
  assert(isString(key), '[SessionStorage] key must be a string')
}

export function setItem(key, value) {
  _validateKey(key)
  isNil(value) && Logger.warn('[SessionStorage] value is null or undefined')

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
    Logger.warn('[SessionStorage] store value can\'t be parsed')
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
