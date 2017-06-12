import localStorage from './localStorage'
import sessionStorage from './sessionStorage'
import Logger from 'logger-js'

Logger.setLevel(process.env.NODE_ENV === 'production' ? Logger.WARN : Logger.DEBUG)
export {localStorage, sessionStorage}
export default {
  localStorage,
  sessionStorage
}
