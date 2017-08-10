export const SHOW_PASSWORD = 'SHOW_PASSWORD'
export const HIDE_PASSWORD = 'HIDE_PASSWORD'
export const CHANGE_PASSWORD_VALUE = 'CHANGE_PASSWORD_VALUE'
export const CHANGE_PASSWORD_REPEAT_VALUE = 'CHANGE_PASSWORD_REPEAT_VALUE'
export const SKIP_PASSWORD_NOTIFICATION_SHOW = 'SKIP_PASSWORD_NOTIFICATION_SHOW'
export const SKIP_PASSWORD_NOTIFICATION_HIDE = 'SKIP_PASSWORD_NOTIFICATION_HIDE'
export const ERROR_PASSWORD_VALUE = 'ERROR_PASSWORD_VALUE'
export const ERROR_PASSWORD_REPEAT_VALUE = 'ERROR_PASSWORD_REPEAT_VALUE'
export const CLEAR_PASSWORD_VALUE = 'CLEAR_PASSWORD_VALUE'

export function showPassword () {
  return {
    type: SHOW_PASSWORD
  }
}

export function hidePassword () {
  return {
    type: HIDE_PASSWORD
  }
}

export function changePasswordValue (data) {
  return {
    type: CHANGE_PASSWORD_VALUE,
    data
  }
}

export function changePasswordRepeatValue (data) {
  return {
    type: CHANGE_PASSWORD_REPEAT_VALUE,
    data
  }
}

export function passwordNotificationShow () {
  return {
    type: SKIP_PASSWORD_NOTIFICATION_SHOW
  }
}

export function passwordNotificationHide () {
  return {
    type: SKIP_PASSWORD_NOTIFICATION_HIDE
  }
}

export function errorPasswordValue (data) {
  return {
    type: ERROR_PASSWORD_VALUE,
    data
  }
}

export function errorPasswordRepeatValue (data) {
  return {
    type: ERROR_PASSWORD_REPEAT_VALUE,
    data
  }
}

export function clearPasswordError (data) {
  return {
    type: CLEAR_PASSWORD_VALUE,
    data
  }
}
