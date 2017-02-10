export const SHOW_CHANGE_PASSWORD_VIEW = 'SHOW_CHANGE_PASSWORD_VIEW'
export const HIDE_CHANGE_PASSWORD_VIEW = 'HIDE_CHANGE_PASSWORD_VIEW'

export const CHANGE_OLD_PASSWORD_VALUE = 'CHANGE_OLD_PASSWORD_VALUE'
export const CHANGE_NEW_PASSWORD_VALUE = 'CHANGE_NEW_PASSWORD_VALUE'
export const CHANGE_NEW_PASSWORD_REPEAT_VALUE = 'CHANGE_NEW_PASSWORD_REPEAT_VALUE'

export const PASSWORD_CHANGED = 'PASSWORD_CHANGED'
export const SHOW_PASSWORD_CHANGED_NOTIFICATION = 'SHOW_PASSWORD_CHANGED_NOTIFICATION'
export const HIDE_PASSWORD_CHANGED_NOTIFICATION = 'HIDE_PASSWORD_CHANGED_NOTIFICATION'

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

export function changeNewPasswordRepeatValue (data) {
  return {
    type: CHANGE_NEW_PASSWORD_REPEAT_VALUE,
    data
  }
}

export function passwordChanged () {
  return {
    type: PASSWORD_CHANGED
  }
}

export function showPasswordChangedNotification () {
  return {
    type: SHOW_PASSWORD_CHANGED_NOTIFICATION
  }
}

export function hidePasswordChangedNotification () {
  return {
    type: HIDE_PASSWORD_CHANGED_NOTIFICATION
  }
}
