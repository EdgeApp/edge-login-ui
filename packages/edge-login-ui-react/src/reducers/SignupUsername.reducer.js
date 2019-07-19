import { combineReducers } from 'redux'

import { GET_DETAILS } from '../actions/SignupReviewDetails.action'
import * as ACTION from '../actions/SignupUsername.action'

const username = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_USERNAME_VALUE:
      return action.data
    case GET_DETAILS:
      return ''
    default:
      return state
  }
}

const error = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_USERNAME_VALUE:
      return action.data
    case ACTION.CLEAR_ERROR_USERNAME_VALUE:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  username,
  error
})
