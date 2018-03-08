import { GET_DETAILS } from '../ReviewDetails/ReviewDetails.action'
import * as ACTION from './Username.action'

export const username = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_USERNAME_VALUE:
      return action.data
    case GET_DETAILS:
      return ''
    default:
      return state
  }
}

export const error = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_USERNAME_VALUE:
      return action.data
    case ACTION.CLEAR_ERROR_USERNAME_VALUE:
      return ''
    default:
      return state
  }
}
