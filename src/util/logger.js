/**
 * Created by xsdlr on 2017/4/25.
 */
let instance = null
class Logger {
  constructor () {
    if (!instance) {
      instance = this
    }
    // level 定义
    this.DEBUG = {level: 0, type: 'debug'}
    this.INFO = {level: 1, type: 'info'}
    this.WARN = {level: 2, type: 'warn'}
    this.ERROR = {level: 3, type: 'error'}
    this.OFF = {level: 10, type: 'off'}

    this.logLevel = this.DEBUG
    return instance
  }

  /***
   * 设置等级
   * @param level [DEBUG,INFO,WARN,ERROR,OFF]
   */
  setLevel (level) {
    this.logLevel = Object.assign({}, this.DEBUG, level)
  }

  /***
   * log debug
   * @param args
   */
  debug (...args) {
    this._log(this.DEBUG, args)
  }

  /***
   * log info
   * @param args
   */
  info (...args) {
    this._log(this.INFO, args)
  }

  /***
   * log warn
   * @param args
   */
  warn (...args) {
    this._log(this.WARN, args)
  }

  /***
   * log error
   * @param args
   */
  error (...args) {
    this._log(this.ERROR, args)
  }

  _log (level = this.OFF, args) {
    const type = level.type
    if (level.level >= this.logLevel.level) {
      const f = console[type]
      if (typeof f === 'function') {
        Function.apply.apply(f, [console, args])
      }
    }
  }
}

export default new Logger()
