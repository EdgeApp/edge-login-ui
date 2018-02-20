import * as ACTION from './ChangePin.action'

export const view = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_CHANGE_PIN_VIEW:
      return true
    case ACTION.HIDE_CHANGE_PIN_VIEW:
      return false
    default:
      return state
  }
}

export const password = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PIN_PASSWORD_VALUE:
      return action.data
    case ACTION.PIN_CHANGED:
      return ''
    default:
      return state
  }
}

export const pin = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PIN_VALUE:
      return action.data
    case ACTION.PIN_CHANGED:
      return ''
    case ACTION.NOTIFY_SUCCESS_PIN_CHANGE:
      return true
    default:
      return state
  }
}

export const pinChangedNotification = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_PIN_CHANGED_NOTIFICATION:
      return true
    case ACTION.HIDE_PIN_CHANGED_NOTIFICATION:
      return false
    default:
      return state
  }
}

export const error = (state = '', action) => {
  switch (action.type) {
    case ACTION.SHOW_PIN_CHANGE_ERROR:
      return action.data
    case ACTION.CLEAR_PIN_CHANGE_ERROR:
      return ''
    default:
      return state
  }
}
