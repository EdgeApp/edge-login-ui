export const CHANGE_NEW_PASSWORD_VALUE = 'CHANGE_NEW_PASSWORD_VALUE'
export const CHANGE_NEW_PASSWORD_REPEAT_VALUE =
  'CHANGE_NEW_PASSWORD_REPEAT_VALUE'
export const PASSWORD_CHANGE_SHOW_PASSWORD = 'PASSWORD_CHANGE_SHOW_PASSWORD'
export const PASSWORD_CHANGE_HIDE_PASSWORD = 'PASSWORD_CHANGE_HIDE_PASSWORD'
export const ERROR_CHANGE_PASSWORD = 'ERROR_CHANGE_PASSWORD'
export const ERROR_CHANGE_PASSWORD_REPEAT = 'ERROR_CHANGE_PASSWORD_REPEAT'
export const CLEAR_CHANGE_PASSWORD = 'CLEAR_CHANGE_PASSWORD'
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED'

export function changeNewPasswordValue (data) {
  return {
    type: CHANGE_NEW_PASSWORD_VALUE,
    data
  }
}

export function changeNewPasswordRepeatValue (data) {
  return {
    type: CHANGE_NEW_PASSWORD_REPEAT_VALUE,
    data
  }
}

export function changePasswordShowPassword () {
  return {
    type: PASSWORD_CHANGE_SHOW_PASSWORD
  }
}

export function changePasswordHidePassword () {
  return {
    type: PASSWORD_CHANGE_HIDE_PASSWORD
  }
}

export function passwordChanged () {
  return {
    type: PASSWORD_CHANGED
  }
}

export function errorChangePassword (data) {
  return {
    type: ERROR_CHANGE_PASSWORD,
    data
  }
}

export function errorChangePasswordRepeat (data) {
  return {
    type: ERROR_CHANGE_PASSWORD_REPEAT,
    data
  }
}

export function clearChangePassword () {
  return {
    type: CLEAR_CHANGE_PASSWORD
  }
}
