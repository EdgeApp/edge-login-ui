import {
  DELETE_USER_FROM_CACHE,
  REMOVE_USER_LOGIN,
  SELECT_USER_LOGIN
} from './CachedUsers/CachedUsers.action'
import * as ACTION from './Login.action'

export const viewPassword = (state = false, action) => {
  switch (action.type) {
    case ACTION.OPEN_LOG_IN:
      return true
    case ACTION.CLOSE_LOG_IN:
      return false
    case ACTION.OPEN_LOG_IN_USING_PIN:
      return false
    case ACTION.CLOSE_LOG_IN_USING_PIN:
      return true
    case SELECT_USER_LOGIN:
      return false
    case DELETE_USER_FROM_CACHE:
      return true
    default:
      return state
  }
}

export const viewPIN = (state = false, action) => {
  switch (action.type) {
    case ACTION.OPEN_LOG_IN_USING_PIN:
      return true
    case ACTION.CLOSE_LOG_IN_USING_PIN:
      return false
    case ACTION.OPEN_LOG_IN:
      return false
    case ACTION.CLOSE_LOG_IN:
      return true
    case SELECT_USER_LOGIN:
      return true
    case REMOVE_USER_LOGIN:
      return false
    case DELETE_USER_FROM_CACHE:
      return false
    default:
      return state
  }
}

export const username = (state = '', action) => {
  switch (action.type) {
    case ACTION.LOG_IN_USERNAME:
      return action.data

    case SELECT_USER_LOGIN:
      return action.data

    case DELETE_USER_FROM_CACHE:
      return ''

    default:
      return state
  }
}

export const password = (state = '', action) => {
  switch (action.type) {
    case ACTION.LOG_IN_PASSWORD:
      return action.data

    case ACTION.USER_LOGIN:
      return ''

    case DELETE_USER_FROM_CACHE:
      return ''

    default:
      return state
  }
}

export const showCachedUsers = (state = false, action) => {
  switch (action.type) {
    case ACTION.OPEN_USER_LIST:
      return true

    case ACTION.CLOSE_USER_LIST:
      return false

    case ACTION.LOG_IN_USERNAME:
      return false

    case SELECT_USER_LOGIN:
      return false

    default:
      return state
  }
}

export const pin = (state = '', action) => {
  switch (action.type) {
    case ACTION.LOG_IN_PIN:
      return action.data

    case ACTION.USER_LOGIN:
      return ''

    default:
      return state
  }
}
export const pinDummy = (state = '', action) => {
  switch (action.type) {
    case ACTION.LOG_IN_PIN:
      const len = action.data.length
      let retval = ''
      for (let i = 0; i < len; i++) {
        retval += '·'
      }
      return retval
    case ACTION.USER_LOGIN:
      return ''
    default:
      return state
  }
}

export const edgeLoginResults = (state = '', action) => {
  switch (action.type) {
    case ACTION.REQUEST_EDGE_LOGIN:
      return action.data
    default:
      return state
  }
}

export const edgeUsername = (state = '', action) => {
  switch (action.type) {
    case ACTION.SET_EDGE_USERNAME:
      return action.userName
    default:
      return state
  }
}

export const edgeAccount = (state = '', action) => {
  switch (action.type) {
    case ACTION.SET_EDGE_ACCOUNT:
      return action.account
    default:
      return state
  }
}

export const loginPinWait = (state = false, action) => {
  switch (action.type) {
    case ACTION.ENABLE_PIN_WAIT_DURATION:
      return action.durationLeft
    case ACTION.REFRESH_PIN_WAIT_DURATION:
      return action.durationLeft
    case ACTION.DISABLE_PIN_WAIT_DURATION:
      return false
    default:
      return state
  }
}

export const loginPasswordWait = (state = false, action) => {
  switch (action.type) {
    case ACTION.ENABLE_PASSWORD_WAIT_DURATION:
      return action.durationLeft
    case ACTION.REFRESH_PASSWORD_WAIT_DURATION:
      return action.durationLeft
    case ACTION.DISABLE_PASSWORD_WAIT_DURATION:
      return false
    default:
      return state
  }
}

export const loginNotification = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_LOGIN_NOTIFICATION:
      return true
    case ACTION.HIDE_LOGIN_NOTIFICATION:
      return false
    default:
      return state
  }
}

export const error = (state = '', action) => {
  switch (action.type) {
    case ACTION.SHOW_ERROR_LOGIN_MESSAGE:
      return action.data
    case ACTION.CLEAR_ERROR_LOGIN_MESSAGE:
      return ''
    default:
      return state
  }
}

export const errorPin = (state = '', action) => {
  switch (action.type) {
    case ACTION.SHOW_ERROR_LOGIN_PIN_MESSAGE:
      return action.data
    case ACTION.CLEAR_ERROR_LOGIN_PIN_MESSAGE:
      return ''
    default:
      return state
  }
}

export const mobileLoginView = (state = false, action) => {
  switch (action.type) {
    case ACTION.MOBILE_LOGIN_WITH_PASSWORD_VIEW:
      return false
    case ACTION.MOBILE_LOGIN_EDGE_VIEW:
      return true
    default:
      return state
  }
}
