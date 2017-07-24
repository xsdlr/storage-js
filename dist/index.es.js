/*
 * storage4js v0.0.1
 * (c) xsdlr
 * Released under the MIT License.
 */

import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import Logger from 'log4js-helper';

function assert(condition, msg) {
  if (!condition) { throw new Error(("" + msg)) }
}

function isNil(value) {
  return value == null
}

function _validateKey(key) {
  assert(!isNil(key), '[LocalStorage] key不能为空');
  assert(isString(key), '[LocalStorage] key必须为string');
}

function setItem(key, value, expire) {
  _validateKey(key);
  isNil(value) && Logger.warn('[LocalStorage] value为null或undefined');
  var _expire = expire || 0;
  assert(isNumber(_expire), '[LocalStorage] expire必须是number');

  var storeValue = {
    value: value,
    expireTime: _expire > 0 ? Date.now() + _expire : null
  };
  Logger.debug('[LocalStorage] save', ("key: " + key), storeValue);
  localStorage.setItem(key, JSON.stringify(storeValue));
}

function getItem(key) {
  _validateKey(key);
  var localStorageString = localStorage.getItem(key) || '{}';
  var jsonValue = {};
  try {
    jsonValue = JSON.parse(localStorageString);
  } catch (e) {
    Logger.warn('[LocalStorage] 存储的值无法解析');
  }
  var value = jsonValue.value;
  var expireTime = jsonValue.expireTime;
  if (isNil(expireTime) || expireTime >= Date.now()) {
    return value
  } else {
    Logger.debug(("key为" + key + "的值超时删除"));
    localStorage.removeItem(key);
    return undefined
  }
}

function removeItem(key) {
  _validateKey(key);
  localStorage.removeItem(key);
}

function clear() {
  localStorage.clear();
}

var localStorage$1 = {
  setItem: setItem,
  getItem: getItem,
  removeItem: removeItem,
  clear: clear
};

function _validateKey$1(key) {
  assert(!isNil(key), '[SessionStorage] key不能为空');
  assert(isString(key), '[SessionStorage] key必须为string');
}

function setItem$1(key, value) {
  _validateKey$1(key);
  isNil(value) && Logger.warn('[SessionStorage] value为null或undefined');

  var storeValue = {
    value: value
  };
  Logger.debug('[SessionStorage] save', ("key: " + key), storeValue);
  sessionStorage.setItem(key, JSON.stringify(storeValue));
}

function getItem$1(key) {
  _validateKey$1(key);
  var storageString = sessionStorage.getItem(key) || '{}';
  var jsonValue = {};
  try {
    jsonValue = JSON.parse(storageString);
  } catch (e) {
    Logger.warn('[SessionStorage] 存储的值无法解析');
  }
  var value = jsonValue.value;
  return value
}

function removeItem$1(key) {
  _validateKey$1(key);
  sessionStorage.removeItem(key);
}

function clear$1() {
  sessionStorage.clear();
}

var sessionStorage$1 = {
  setItem: setItem$1,
  getItem: getItem$1,
  removeItem: removeItem$1,
  clear: clear$1
};

Logger.setLevel(process.env.NODE_ENV === 'production' ? Logger.WARN : Logger.DEBUG);
var index = {
  localStorage: localStorage$1,
  sessionStorage: sessionStorage$1
};

export { localStorage$1 as localStorage, sessionStorage$1 as sessionStorage };export default index;
