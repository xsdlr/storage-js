import localStorage from './localStorage'
import sessionStorage from './sessionStorage'
import Logger from 'log4js-helper'

Logger.setLevel(process.env.NODE_ENV === 'production' ? Logger.WARN : Logger.DEBUG)
export {localStorage, sessionStorage}
export default {
  localStorage,
  sessionStorage
}
