/*
 * storage-js v0.0.1
 * (c) xsdlr
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
  if (!condition) throw new Error("" + msg);
}

function isNil(value) {
  return value == null;
}

/**
 * Created by xsdlr on 2017/4/25.
 */
var instance = null;

var Logger = function () {
  function Logger() {
    babelHelpers.classCallCheck(this, Logger);

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


  babelHelpers.createClass(Logger, [{
    key: 'setLevel',
    value: function setLevel(level) {
      this.logLevel = Object.assign({}, this.DEBUG, level);
    }

    /***
     * log debug
     * @param args
     */

  }, {
    key: 'debug',
    value: function debug() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this._log(this.DEBUG, args);
    }

    /***
     * log info
     * @param args
     */

  }, {
    key: 'info',
    value: function info() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this._log(this.INFO, args);
    }

    /***
     * log warn
     * @param args
     */

  }, {
    key: 'warn',
    value: function warn() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this._log(this.WARN, args);
    }

    /***
     * log error
     * @param args
     */

  }, {
    key: 'error',
    value: function error() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this._log(this.ERROR, args);
    }
  }, {
    key: '_log',
    value: function _log() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.OFF;
      var args = arguments[1];

      var type = level.type;
      if (level.level >= this.logLevel.level) {
        var f = console[type];
        if (typeof f === 'function') {
          Function.apply.apply(f, [console, args]);
        }
      }
    }
  }]);
  return Logger;
}();

var Logger$1 = new Logger();

function _validateKey(key) {
  assert(!isNil(key), '[LocalStorage] key不能为空');
  assert(isString(key), '[LocalStorage] key必须为string');
}

function setItem(key, value, expire) {
  _validateKey(key);
  isNil(value) && Logger$1.warn('[LocalStorage] value为null或undefined');
  var _expire = expire || 0;
  assert(isNumber(_expire), '[LocalStorage] expire必须是number');

  var storeValue = {
    value: value,
    expireTime: _expire > 0 ? Date.now() + _expire : null
  };
  Logger$1.debug('[LocalStorage] save', 'key: ' + key, storeValue);
  localStorage.setItem(key, JSON.stringify(storeValue));
}

function getItem(key) {
  _validateKey(key);
  var localStorageString = localStorage.getItem(key) || '{}';
  var jsonValue = {};
  try {
    jsonValue = JSON.parse(localStorageString);
  } catch (e) {
    Logger$1.warn('[LocalStorage] 存储的值无法解析');
  }
  var _jsonValue = jsonValue,
      value = _jsonValue.value,
      expireTime = _jsonValue.expireTime;

  if (isNil(expireTime) || expireTime >= Date.now()) {
    return value;
  } else {
    Logger$1.debug('key\u4E3A' + key + '\u7684\u503C\u8D85\u65F6\u5220\u9664');
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
  isNil(value) && Logger$1.warn('[SessionStorage] value为null或undefined');

  var storeValue = {
    value: value
  };
  Logger$1.debug('[SessionStorage] save', 'key: ' + key, storeValue);
  sessionStorage.setItem(key, JSON.stringify(storeValue));
}

function getItem$1(key) {
  _validateKey$1(key);
  var storageString = sessionStorage.getItem(key) || '{}';
  var jsonValue = {};
  try {
    jsonValue = JSON.parse(storageString);
  } catch (e) {
    Logger$1.warn('[SessionStorage] 存储的值无法解析');
  }
  var _jsonValue = jsonValue,
      value = _jsonValue.value;

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

Logger$1.setLevel(process.env.NODE_ENV === 'production' ? Logger$1.WARN : Logger$1.DEBUG);
var index = {
  localStorage: localStorage$1,
  sessionStorage: sessionStorage$1
};

exports.localStorage = localStorage$1;
exports.sessionStorage = sessionStorage$1;
exports['default'] = index;
