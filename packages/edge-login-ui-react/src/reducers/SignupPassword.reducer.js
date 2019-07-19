import { combineReducers } from 'redux'

import * as ACTION from '../actions/SignupPassword.action'
import { GET_DETAILS } from '../actions/SignupReviewDetails.action'
import passwordValidation from './PasswordValidation.reducer'

const inputState = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_PASSWORD:
      return true

    case ACTION.HIDE_PASSWORD:
      return false

    default:
      return state
  }
}

const password = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PASSWORD_VALUE:
      return action.data
    case GET_DETAILS:
      return ''
    default:
      return state
  }
}

const passwordRepeat = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PASSWORD_REPEAT_VALUE:
      return action.data
    case GET_DETAILS:
      return ''
    default:
      return state
  }
}

const notification = (state = false, action) => {
  switch (action.type) {
    case ACTION.SKIP_PASSWORD_NOTIFICATION_SHOW:
      return true

    case ACTION.SKIP_PASSWORD_NOTIFICATION_HIDE:
      return false

    default:
      return state
  }
}

const errorPassword = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_PASSWORD_VALUE:
      return action.data
    case ACTION.CLEAR_PASSWORD_VALUE:
      return ''
    default:
      return state
  }
}

const errorPasswordRepeat = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_PASSWORD_REPEAT_VALUE:
      return action.data
    case ACTION.CLEAR_PASSWORD_VALUE:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  inputState,
  password,
  passwordRepeat,
  notification,
  error: combineReducers({
    password: errorPassword,
    passwordRepeat: errorPasswordRepeat
  }),
  validation: passwordValidation
})
