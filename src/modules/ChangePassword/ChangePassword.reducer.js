import * as ACTION from './ChangePassword.action'

export const view = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_CHANGE_PASSWORD_VIEW :
      return true
    case ACTION.HIDE_CHANGE_PASSWORD_VIEW :
      return false
    default:
      return state
  }
}

export const oldPassword = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_OLD_PASSWORD_VALUE :
      return action.data
    case ACTION.PASSWORD_CHANGED :
      return ''
    default:
      return state
  }
}

export const newPassword = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_NEW_PASSWORD_VALUE :
      return action.data
    case ACTION.PASSWORD_CHANGED :
      return ''
    case ACTION.NOTIFY_SUCCESS_PASSWORD_CHANGED:
      return true
    default:
      return state
  }
}

export const newPasswordRepeat = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_NEW_PASSWORD_REPEAT_VALUE :
      return action.data
    case ACTION.PASSWORD_CHANGED :
      return ''
    default:
      return state
  }
}
