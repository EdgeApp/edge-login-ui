export const OPEN_LOG_IN = 'OPEN_LOG_IN'
export const CLOSE_LOG_IN = 'CLOSE_LOG_IN'
export const OPEN_LOG_IN_USING_PIN = 'OPEN_LOG_IN_USING_PIN'
export const CLOSE_LOG_IN_USING_PIN = 'CLOSE_LOG_IN_USING_PIN'
export const LOG_IN_USERNAME = 'LOG_IN_USERNAME'
export const LOG_IN_PASSWORD = 'LOG_IN_PASSWORD'
export const LOG_IN_PIN = 'LOG_IN_PIN'
export const OPEN_USER_LIST = 'OPEN_USER_LIST'
export const CLOSE_USER_LIST = 'CLOSE_USER_LIST'
export const USER_LOGIN = 'USER_LOGIN'
export const REQUEST_EDGE_LOGIN = 'REQUEST_EDGE_LOGIN'
export const SET_EDGE_USERNAME = 'SET_EDGE_USERNAME'
export const SET_EDGE_ACCOUNT = 'SET_EDGE_ACCOUNT'
export const ENABLE_PIN_WAIT_DURATION = 'ENABLE_PIN_WAIT_DURATION'
export const DISABLE_PIN_WAIT_DURATION = 'DISABLE_PIN_WAIT_DURATION'
export const REFRESH_PIN_WAIT_DURATION = 'REFRESH_PIN_WAIT_DURATION'
export const ENABLE_PASSWORD_WAIT_DURATION = 'ENABLE_PASSWORD_WAIT_DURATION'
export const DISABLE_PASSWORD_WAIT_DURATION = 'DISABLE_PASSWORD_WAIT_DURATION'
export const REFRESH_PASSWORD_WAIT_DURATION = 'REFRESH_PASSWORD_WAIT_DURATION'
export const SHOW_LOGIN_NOTIFICATION = 'SHOW_LOGIN_NOTIFICATION'
export const HIDE_LOGIN_NOTIFICATION = 'HIDE_LOGIN_NOTIFICATION'
export const SHOW_ERROR_LOGIN_MESSAGE = 'SHOW_ERROR_LOGIN_MESSAGE'
export const CLEAR_ERROR_LOGIN_MESSAGE = 'CLEAR_ERROR_LOGIN_MESSAGE'
export const SHOW_ERROR_LOGIN_PIN_MESSAGE = 'SHOW_ERROR_LOGIN_PIN_MESSAGE'
export const CLEAR_ERROR_LOGIN_PIN_MESSAGE = 'CLEAR_ERROR_LOGIN_PIN_MESSAGE'
export const MOBILE_LOGIN_WITH_PASSWORD_VIEW = 'MOBILE_LOGIN_WITH_PASSWORD_VIEW'
export const MOBILE_LOGIN_EDGE_VIEW = 'MOBILE_LOGIN_EDGE_VIEW'

export function enablePinTimeout (durationLeft) {
  return {
    type: ENABLE_PIN_WAIT_DURATION,
    durationLeft
  }
}

export function disablePinTimeout () {
  return {
    type: DISABLE_PIN_WAIT_DURATION
  }
}

export function refreshPinTimeout (durationLeft) {
  return {
    type: REFRESH_PIN_WAIT_DURATION,
    durationLeft
  }
}

export function enablePasswordTimeout (durationLeft) {
  return {
    type: ENABLE_PASSWORD_WAIT_DURATION,
    durationLeft
  }
}

export function disablePasswordTimeout () {
  return {
    type: DISABLE_PASSWORD_WAIT_DURATION
  }
}

export function refreshPasswordTimeout (durationLeft) {
  return {
    type: REFRESH_PASSWORD_WAIT_DURATION,
    durationLeft
  }
}

export function openLogin () {
  return {
    type: OPEN_LOG_IN
  }
}

export function closeLogin () {
  return {
    type: CLOSE_LOG_IN
  }
}

export function openLoginUsingPin () {
  return {
    type: OPEN_LOG_IN_USING_PIN
  }
}

export function closeLoginUsingPin () {
  return {
    type: CLOSE_LOG_IN_USING_PIN
  }
}

export function loginUsername (data) {
  return {
    type: LOG_IN_USERNAME,
    data
  }
}

export function loginPassword (data) {
  return {
    type: LOG_IN_PASSWORD,
    data
  }
}

export function loginPIN (data) {
  return {
    type: LOG_IN_PIN,
    data
  }
}

export function openUserList () {
  return {
    type: OPEN_USER_LIST
  }
}

export function closeUserList () {
  return {
    type: CLOSE_USER_LIST
  }
}

export function userLogin (data) {
  return {
    type: USER_LOGIN,
    data
  }
}

export function requestEdgeLogin (data) {
  return {
    type: REQUEST_EDGE_LOGIN,
    data
  }
}

export function setEdgeUsername (userName) {
  return {
    type: SET_EDGE_USERNAME,
    userName
  }
}

export function setEdgeAccount (account) {
  return {
    type: SET_EDGE_ACCOUNT,
    account
  }
}

export function showLoginNotification () {
  return {
    type: SHOW_LOGIN_NOTIFICATION
  }
}

export function hideLoginNotification () {
  return {
    type: HIDE_LOGIN_NOTIFICATION
  }
}

export function showErrorLoginMessage (data) {
  return {
    type: SHOW_ERROR_LOGIN_MESSAGE,
    data
  }
}

export function clearErrorLoginMessage () {
  return {
    type: CLEAR_ERROR_LOGIN_MESSAGE
  }
}

export function showErrorLoginPinMessage (data) {
  return {
    type: SHOW_ERROR_LOGIN_PIN_MESSAGE,
    data
  }
}

export function clearErrorLoginPinMessage () {
  return {
    type: CLEAR_ERROR_LOGIN_PIN_MESSAGE
  }
}

export function showMobileLoginWithPasswordView () {
  return {
    type: MOBILE_LOGIN_WITH_PASSWORD_VIEW
  }
}

export function showMobileLoginEdgeView () {
  return {
    type: MOBILE_LOGIN_EDGE_VIEW
  }
}
