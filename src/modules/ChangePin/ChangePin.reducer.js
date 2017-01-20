import * as ACTION from './ChangePin.action'

export const view = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_CHANGE_PIN_VIEW :
      return true
    case ACTION.HIDE_CHANGE_PIN_VIEW :
      return false
    default:
      return state
  }
}

export const oldPin = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_OLD_PIN_VALUE :
      return action.data
    case ACTION.PIN_CHANGED :
      return ''
    default:
      return state
  }
}

export const newPin = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_NEW_PIN_VALUE :
      return action.data
    case ACTION.PIN_CHANGED :
      return ''
    default:
      return state
  }
}
