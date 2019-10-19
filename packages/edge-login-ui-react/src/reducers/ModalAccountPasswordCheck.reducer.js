import { combineReducers } from 'redux'

import * as ACTION from '../actions/ModalAccountPasswordCheck.action.js'

const password = (state = '', action) => {
  switch (action.type) {
    case ACTION.ACCOUNT_PASSWORD_CHECK_MODAL_PASSWORD:
      return action.data
    case ACTION.CLOSE_ACCOUNT_PASSWORD_CHECK_MODAL:
      return ''
    default:
      return state
  }
}

const view = (state = false, action) => {
  switch (action.type) {
    case ACTION.OPEN_ACCOUNT_PASSWORD_CHECK_MODAL:
      return true
    case ACTION.CLOSE_ACCOUNT_PASSWORD_CHECK_MODAL:
      return false
    default:
      return state
  }
}

const route = (state = '', action) => {
  switch (action.type) {
    case ACTION.OPEN_ACCOUNT_PASSWORD_CHECK_MODAL:
      return action.data
    case ACTION.CLOSE_ACCOUNT_PASSWORD_CHECK_MODAL:
      return ''
    default:
      return state
  }
}

const error = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_ACCOUNT_PASSWORD_CHECK_MODAL:
      return action.data
    case ACTION.CLEAR_ACCOUNT_PASSWORD_CHECK_MODAL:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  password,
  view,
  route,
  error
})
