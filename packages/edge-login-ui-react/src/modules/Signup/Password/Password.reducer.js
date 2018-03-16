import { GET_DETAILS } from '../ReviewDetails/ReviewDetails.action'
import * as ACTION from './Password.action'

export const inputState = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_PASSWORD:
      return true

    case ACTION.HIDE_PASSWORD:
      return false

    default:
      return state
  }
}

export const password = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PASSWORD_VALUE:
      return action.data
    case GET_DETAILS:
      return ''
    default:
      return state
  }
}

export const passwordRepeat = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PASSWORD_REPEAT_VALUE:
      return action.data
    case GET_DETAILS:
      return ''
    default:
      return state
  }
}

export const notification = (state = false, action) => {
  switch (action.type) {
    case ACTION.SKIP_PASSWORD_NOTIFICATION_SHOW:
      return true

    case ACTION.SKIP_PASSWORD_NOTIFICATION_HIDE:
      return false

    default:
      return state
  }
}

export const errorPassword = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_PASSWORD_VALUE:
      return action.data
    case ACTION.CLEAR_PASSWORD_VALUE:
      return ''
    default:
      return state
  }
}

export const errorPasswordRepeat = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_PASSWORD_REPEAT_VALUE:
      return action.data
    case ACTION.CLEAR_PASSWORD_VALUE:
      return ''
    default:
      return state
  }
}
