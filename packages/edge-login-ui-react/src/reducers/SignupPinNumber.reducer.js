import { combineReducers } from 'redux'

import * as ACTION from '../actions/SignupPinNumber.action'
import { GET_DETAILS } from '../actions/SignupReviewDetails.action'

const pin = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PIN_NUMBER_VALUE:
      return action.data
    case GET_DETAILS:
      return ''
    default:
      return state
  }
}

const error = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_PIN_NUMBER_VALUE:
      return action.data
    case ACTION.CLEAR_ERROR_PIN_NUMBER_VALUE:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  pin,
  error
})
