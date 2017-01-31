export const SHOW_CHANGE_PIN_VIEW       = 'SHOW_CHANGE_PIN_VIEW'
export const HIDE_CHANGE_PIN_VIEW       = 'HIDE_CHANGE_PIN_VIEW'

export const CHANGE_PIN_PASSWORD_VALUE  = 'CHANGE_PIN_PASSWORD_VALUE'
export const CHANGE_PIN_VALUE           = 'CHANGE_PIN_VALUE'

export const PIN_CHANGED                = 'PIN_CHANGED'
export const NOTIFY_SUCCESS_PIN_CHANGE  = 'NOTIFY_SUCCESS_PIN_CHANGE'

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

export function notifySuccessPinChanged() {
  return { type: NOTIFY_SUCCESS_PIN_CHANGE }
}
