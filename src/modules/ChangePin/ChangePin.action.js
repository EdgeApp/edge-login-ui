export const SHOW_CHANGE_PIN_VIEW = 'SHOW_CHANGE_PIN_VIEW'
export const HIDE_CHANGE_PIN_VIEW = 'HIDE_CHANGE_PIN_VIEW'

export const CHANGE_OLD_PIN_VALUE = 'CHANGE_OLD_PIN_VALUE'
export const CHANGE_NEW_PIN_VALUE = 'CHANGE_NEW_PIN_VALUE'

export const PIN_CHANGED = 'PIN_CHANGED'

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

export function changeOldPinValue (data) {
  return {
    type: CHANGE_OLD_PIN_VALUE,
    data
  }
}

export function changeNewPinValue (data) {
  return {
    type: CHANGE_NEW_PIN_VALUE,
    data
  }
}

export function pinChanged () {
  return {
    type: PIN_CHANGED 
  }
}
