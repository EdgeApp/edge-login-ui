import { combineReducers } from 'redux'

import * as ACTION from '../actions/Login.action'
import {
  DELETE_USER_FROM_CACHE,
  REMOVE_USER_LOGIN,
  SELECT_USER_LOGIN,
  USER_TO_DELETE_FROM_CACHE
} from '../actions/LoginCachedUsers.action'

const viewPassword = (state = false, action) => {
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

const viewPIN = (state = false, action) => {
  switch (action.type) {
    case ACTION.OPEN_LOG_IN_USING_PIN:
      return true

    case ACTION.CLOSE_LOG_IN_USING_PIN:
      return false

    case ACTION.OPEN_LOG_IN:
      return false

    case ACTION.CLOSE_LOG_IN:
      return true

    case ACTION.OPEN_LOG_IN_USING_EDGE:
      return false

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

const viewEdge = (state = false, action) => {
  switch (action.type) {
    case ACTION.OPEN_LOG_IN_USING_EDGE:
      return true

    case ACTION.CLOSE_LOG_IN_USING_EDGE:
      return false

    case ACTION.OPEN_LOG_IN_USING_PIN:
      return false

    case ACTION.OPEN_LOG_IN:
      return false

    case SELECT_USER_LOGIN:
      return false

    case REMOVE_USER_LOGIN:
      return false

    case DELETE_USER_FROM_CACHE:
      return false

    default:
      return state
  }
}

const username = (state = '', action) => {
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

const password = (state = '', action) => {
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

const showCachedUsers = (state = false, action) => {
  switch (action.type) {
    case ACTION.OPEN_USER_LIST:
      return true

    case ACTION.CLOSE_USER_LIST:
      return false

    case ACTION.CLOSE_LOG_IN:
      return false

    case ACTION.CLOSE_LOG_IN_USING_PIN:
      return false

    case ACTION.CLOSE_LOG_IN_USING_EDGE:
      return false

    case ACTION.LOG_IN_USERNAME:
      return false

    case SELECT_USER_LOGIN:
      return false

    case USER_TO_DELETE_FROM_CACHE:
      return false

    case DELETE_USER_FROM_CACHE:
      return false

    default:
      return state
  }
}

const pin = (state = '', action) => {
  switch (action.type) {
    case ACTION.LOG_IN_PIN:
      return action.data

    case ACTION.USER_LOGIN:
      return ''

    case SELECT_USER_LOGIN:
      return ''

    default:
      return state
  }
}
const pinDummy = (state = '', action) => {
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

const edgeLoginResults = (state = null, action) => {
  switch (action.type) {
    case ACTION.REQUEST_EDGE_LOGIN:
      return action.data
    default:
      return state
  }
}

const edgeUsername = (state = '', action) => {
  switch (action.type) {
    case ACTION.SET_EDGE_USERNAME:
      return action.userName
    default:
      return state
  }
}

const edgeAccount = (state = '', action) => {
  switch (action.type) {
    case ACTION.SET_EDGE_ACCOUNT:
      return action.account
    default:
      return state
  }
}

const loginPinWait = (state = false, action) => {
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

const loginPasswordWait = (state = false, action) => {
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

const loginNotification = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_LOGIN_NOTIFICATION:
      return true
    case ACTION.HIDE_LOGIN_NOTIFICATION:
      return false
    default:
      return state
  }
}

const error = (state = '', action) => {
  switch (action.type) {
    case ACTION.SHOW_ERROR_LOGIN_MESSAGE:
      return action.data
    case ACTION.CLEAR_ERROR_LOGIN_MESSAGE:
      return ''
    default:
      return state
  }
}

const errorPin = (state = '', action) => {
  switch (action.type) {
    case ACTION.SHOW_ERROR_LOGIN_PIN_MESSAGE:
      return action.data
    case ACTION.CLEAR_ERROR_LOGIN_PIN_MESSAGE:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  viewPassword,
  viewPIN,
  viewEdge,
  username,
  password,
  pin,
  pinDummy,
  showCachedUsers,
  edgeLoginResults,
  edgeUsername,
  edgeAccount,
  loginPinWait,
  loginPasswordWait,
  loginNotification,
  error,
  errorPin
})
