export const CHANGE_USERNAME_VALUE = 'CHANGE_USERNAME_VALUE'
export const ERROR_USERNAME_VALUE = 'ERROR_USERNAME_VALUE'
export const CLEAR_ERROR_USERNAME_VALUE = 'CLEAR_ERROR_USERNAME_VALUE'

export function changeUsernameValue (data) {
  return {
    type: CHANGE_USERNAME_VALUE,
    data
  }
}

export function error (data) {
  return {
    type: ERROR_USERNAME_VALUE,
    data
  }
}

export function clearError () {
  return {
    type: CLEAR_ERROR_USERNAME_VALUE
  }
}
