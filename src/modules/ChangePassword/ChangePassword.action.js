export const SHOW_CHANGE_PASSWORD_VIEW = 'SHOW_CHANGE_PASSWORD_VIEW'
export const HIDE_CHANGE_PASSWORD_VIEW = 'HIDE_CHANGE_PASSWORD_VIEW'

export const CHANGE_OLD_PASSWORD_VALUE = 'CHANGE_OLD_PASSWORD_VALUE'
export const CHANGE_NEW_PASSWORD_VALUE = 'CHANGE_NEW_PASSWORD_VALUE'
export const CHANGE_NEW_PASSWORD_REPEAT_VALUE = 'CHANGE_NEW_PASSWORD_REPEAT_VALUE'

export function showPasswordView () {
  return {
    type: SHOW_CHANGE_PASSWORD_VIEW
  }
}

export function hidePasswordView () {
  return {
    type: HIDE_CHANGE_PASSWORD_VIEW
  }
}

export function changeOldPasswordValue (data) {
  return {
    type: CHANGE_OLD_PASSWORD_VALUE,
    data
  }
}

export function changeNewPasswordValue (data) {
  return {
    type: CHANGE_NEW_PASSWORD_VALUE,
    data
  }
}

export function changeNewPasswordRepeatValue () {
  return {
    type: CHANGE_NEW_PASSWORD_REPEAT_VALUE
  }
}

