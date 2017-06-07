/*
 * storage-js v0.0.1
 * (c) xsdlr
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['storage-js'] = global['storage-js'] || {})));
}(this, (function (exports) { 'use strict';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && baseGetTag(value) == numberTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

function assert(condition, msg) {
  if (!condition) throw new Error(`${msg}`);
}

function isNil(value) {
  return value == null;
}

/*
 * logger-js v0.0.1
 * (c) xsdlr
 * Released under the MIT License.
 */

/**
 * Created by xsdlr on 2017/4/25.
 */
let instance = null;
class Logger {
  constructor() {
    if (!instance) {
      instance = this;
    }
    // level 定义
    this.DEBUG = { level: 0, type: 'debug' };
    this.INFO = { level: 1, type: 'info' };
    this.WARN = { level: 2, type: 'warn' };
    this.ERROR = { level: 3, type: 'error' };
    this.OFF = { level: 10, type: 'off' };

    this.logLevel = this.DEBUG;
    return instance;
  }

  /***
   * 设置等级
   * @param level [DEBUG,INFO,WARN,ERROR,OFF]
   */
  setLevel(level) {
    this.logLevel = Object.assign({}, this.DEBUG, level);
  }

  /***
   * log debug
   * @param args
   */
  debug(...args) {
    this._log(this.DEBUG, args);
  }

  /***
   * log info
   * @param args
   */
  info(...args) {
    this._log(this.INFO, args);
  }

  /***
   * log warn
   * @param args
   */
  warn(...args) {
    this._log(this.WARN, args);
  }

  /***
   * log error
   * @param args
   */
  error(...args) {
    this._log(this.ERROR, args);
  }

  _log(level = this.OFF, args) {
    const type = level.type;
    if (level.level >= this.logLevel.level) {
      const f = console[type];
      if (typeof f === 'function') {
        Function.apply.apply(f, [console, args]);
      }
    }
  }
}

var index$1 = new Logger();

function _validateKey(key) {
  assert(!isNil(key), '[ExpireLocalStorage] key不能为空');
  assert(isString(key), '[ExpireLocalStorage] key必须为string');
}

function setItem(key, value, expire) {
  _validateKey(key);
  isNil(value) && index$1.warn('[ExpireLocalStorage] ', 'value为null或undefined');
  const _expire = expire || 0;
  assert(isNumber(_expire), '[ExpireLocalStorage] expire必须是number');

  const storeValue = {
    value,
    expireTime: _expire > 0 ? Date.now() + _expire : null
  };
  index$1.debug(`key: ${key}`, `storeValue: ${JSON.stringify(storeValue)}`);
  localStorage.setItem(key, JSON.stringify(storeValue));
}

function getItem(key) {
  _validateKey(key);
  const localStorageString = localStorage.getItem(key) || '{}';
  let jsonValue = {};
  try {
    jsonValue = JSON.parse(localStorageString);
  } catch (e) {
    index$1.warn('[ExpireLocalStorage] ', '存储的值无法解析');
  }
  const { value, expireTime } = jsonValue;
  if (isNil(expireTime) || expireTime >= Date.now()) {
    return value;
  } else {
    index$1.debug(`key为${key}的值超时删除`);
    localStorage.removeItem(key);
    return undefined;
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
  setItem,
  getItem,
  removeItem,
  clear
};

function _validateKey$1(key) {
  assert(!isNil(key), '[SessionStorage] key不能为空');
  assert(isString(key), '[SessionStorage] key必须为string');
}

function setItem$1(key, value) {
  _validateKey$1(key);
  isNil(value) && index$1.warn('[SessionStorage] ', 'value为null或undefined');

  const storeValue = {
    value
  };
  index$1.debug(`key: ${key}`, `storeValue: ${JSON.stringify(storeValue)}`);
  sessionStorage.setItem(key, JSON.stringify(storeValue));
}

function getItem$1(key) {
  _validateKey$1(key);
  const storageString = sessionStorage.getItem(key) || '{}';
  let jsonValue = {};
  try {
    jsonValue = JSON.parse(storageString);
  } catch (e) {
    index$1.warn('[SessionStorage] ', '存储的值无法解析');
  }
  const { value } = jsonValue;
  return value;
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

var index = {
  localStorage: localStorage$1,
  sessionStorage: sessionStorage$1
};

exports.localStorage = localStorage$1;
exports.sessionStorage = sessionStorage$1;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
