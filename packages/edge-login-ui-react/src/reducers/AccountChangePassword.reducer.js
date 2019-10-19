import { combineReducers } from 'redux'

import * as ACTION from '../actions/AccountChangePassword.action'

const revealPassword = (state = false, action) => {
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

const newPassword = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_NEW_PASSWORD_VALUE:
      return action.data
    case ACTION.PASSWORD_CHANGED:
      return ''
    default:
      return state
  }
}

const newPasswordRepeat = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_NEW_PASSWORD_REPEAT_VALUE:
      return action.data
    case ACTION.PASSWORD_CHANGED:
      return ''
    default:
      return state
  }
}

const errorPassword = (state = '', action) => {
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

const errorPasswordRepeat = (state = '', action) => {
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

export default combineReducers({
  revealPassword,
  newPassword,
  newPasswordRepeat,
  errorPassword,
  errorPasswordRepeat
})
