import * as ACTION from './ChangePassword.action'

export const view = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_CHANGE_PASSWORD_VIEW:
      return true
    case ACTION.HIDE_CHANGE_PASSWORD_VIEW:
      return false
    default:
      return state
  }
}

export const revealPassword = (state = false, action) => {
  switch (action.type) {
    case ACTION.PASSWORD_CHANGE_SHOW_PASSWORD:
      return true
    case ACTION.PASSWORD_CHANGE_HIDE_PASSWORD:
      return false
    case ACTION.PASSWORD_CHANGED:
      return false
    default:
      return state
  }
}

export const oldPassword = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_OLD_PASSWORD_VALUE:
      return action.data
    case ACTION.PASSWORD_CHANGED:
      return ''
    default:
      return state
  }
}

export const newPassword = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_NEW_PASSWORD_VALUE:
      return action.data
    case ACTION.PASSWORD_CHANGED:
      return ''
    case ACTION.NOTIFY_SUCCESS_PASSWORD_CHANGED:
      return true
    default:
      return state
  }
}

export const newPasswordRepeat = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_NEW_PASSWORD_REPEAT_VALUE:
      return action.data
    case ACTION.PASSWORD_CHANGED:
      return ''
    default:
      return state
  }
}

export const passwordChangedNotification = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_PASSWORD_CHANGED_NOTIFICATION:
      return true
    case ACTION.HIDE_PASSWORD_CHANGED_NOTIFICATION:
      return false
    default:
      return state
  }
}

export const errorPassword = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_CHANGE_PASSWORD:
      return action.data
    case ACTION.CLEAR_CHANGE_PASSWORD:
      return ''
    case ACTION.PASSWORD_CHANGED:
      return ''
    default:
      return state
  }
}

export const errorPasswordRepeat = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_CHANGE_PASSWORD_REPEAT:
      return action.data
    case ACTION.CLEAR_CHANGE_PASSWORD:
      return ''
    case ACTION.PASSWORD_CHANGED:
      return ''
    default:
      return state
  }
}
