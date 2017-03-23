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
export const ENABLE_LOGIN_WAIT_DURATION = 'ENABLE_LOGIN_WAIT_DURATION'
export const DISABLE_LOGIN_WAIT_DURATION = 'DISABLE_LOGIN_WAIT_DURATION'
export const REFRESH_LOGIN_WAIT_DURATION = 'REFRESH_LOGIN_WAIT_DURATION'

export function enableTimeout (durationLeft) {
  console.log('inside action.enableTimeout')
  return {
    type: ENABLE_LOGIN_WAIT_DURATION,
    durationLeft
  }
}

export function disableTimeout() {
  console.log('inside action.disableTimeout')
  return {
    type: DISABLE_LOGIN_WAIT_DURATION  
  }
}

export function refreshTimeout(durationLeft) {
  console.log('inside refreshTimeout')
  return {
    type: REFRESH_LOGIN_WAIT_DURATION,
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
