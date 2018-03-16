export const CHANGE_PIN_NUMBER_VALUE = 'CHANGE_PIN_NUMBER_VALUE'
export const ERROR_PIN_NUMBER_VALUE = 'ERROR_PIN_NUMBER_VALUE'
export const CLEAR_ERROR_PIN_NUMBER_VALUE = 'CLEAR_ERROR_PIN_NUMBER_VALUE'

export function changePinNumberValue (data) {
  return {
    type: CHANGE_PIN_NUMBER_VALUE,
    data
  }
}

export function error (data) {
  return {
    type: ERROR_PIN_NUMBER_VALUE,
    data
  }
}

export function clearError (data) {
  return {
    type: CLEAR_ERROR_PIN_NUMBER_VALUE
  }
}
