import { combineReducers } from 'redux'

import * as ACTION from './PasswordRecoveryToken.action.js'

const token = (state = '', action) => {
  switch (action.type) {
    case ACTION.PASSWORD_RECOVERY_TOKEN:
      return action.data
    case ACTION.DONE_PASSWORD_RECOVERY_TOKEN:
      return ''
    default:
      return state
  }
}

const email = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PASSWORD_RECOVERY_EMAIL:
      return action.data
    case ACTION.DONE_PASSWORD_RECOVERY_TOKEN:
      return ''
    default:
      return state
  }
}

const error = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_PASSWORD_RECOVERY_EMAIL:
      return action.data
    case ACTION.CLEAR_PASSWORD_RECOVERY_EMAIL:
      return ''
    case ACTION.DONE_PASSWORD_RECOVERY_TOKEN:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  token,
  email,
  error
})
