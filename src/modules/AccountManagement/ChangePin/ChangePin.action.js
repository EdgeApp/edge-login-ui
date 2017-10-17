export const SHOW_CHANGE_PIN_VIEW = 'SHOW_CHANGE_PIN_VIEW'
export const HIDE_CHANGE_PIN_VIEW = 'HIDE_CHANGE_PIN_VIEW'
export const CHANGE_PIN_PASSWORD_VALUE = 'CHANGE_PIN_PASSWORD_VALUE'
export const CHANGE_PIN_VALUE = 'CHANGE_PIN_VALUE'
export const PIN_CHANGED = 'PIN_CHANGED'
export const SHOW_PIN_CHANGED_NOTIFICATION = 'SHOW_PIN_CHANGED_NOTIFICATION'
export const HIDE_PIN_CHANGED_NOTIFICATION = 'HIDE_PIN_CHANGED_NOTIFICATION'
export const SHOW_PIN_CHANGE_ERROR = 'SHOW_PIN_CHANGE_ERROR'
export const CLEAR_PIN_CHANGE_ERROR = 'CLEAR_PIN_CHANGE_ERROR'

export function showPinView () {
  return {
    type: SHOW_CHANGE_PIN_VIEW
  }
}

export function hidePinView () {
  return {
    type: HIDE_CHANGE_PIN_VIEW
  }
}

export function changePinPasswordValue (data) {
  return {
    type: CHANGE_PIN_PASSWORD_VALUE,
    data
  }
}

export function changePinValue (data) {
  return {
    type: CHANGE_PIN_VALUE,
    data
  }
}

export function pinChanged () {
  return {
    type: PIN_CHANGED
  }
}
export function showPinChangedNotification () {
  return {
    type: SHOW_PIN_CHANGED_NOTIFICATION
  }
}

export function hidePinChangedNotification () {
  return {
    type: HIDE_PIN_CHANGED_NOTIFICATION
  }
}

export function showPinChangeError (data) {
  return {
    type: SHOW_PIN_CHANGE_ERROR,
    data
  }
}

export function clearPinChangeError () {
  return {
    type: CLEAR_PIN_CHANGE_ERROR
  }
}
