export const CHANGE_PIN_VALUE = 'CHANGE_PIN_VALUE'
export const SHOW_PIN_CHANGE_ERROR = 'SHOW_PIN_CHANGE_ERROR'
export const CLEAR_PIN_CHANGE_ERROR = 'CLEAR_PIN_CHANGE_ERROR'

export function changePinValue(data) {
  return {
    type: CHANGE_PIN_VALUE,
    data
  }
}

export function showPinChangeError(data) {
  return {
    type: SHOW_PIN_CHANGE_ERROR,
    data
  }
}

export function clearPinChangeError() {
  return {
    type: CLEAR_PIN_CHANGE_ERROR
  }
}
