import { combineReducers } from 'redux'

import * as ACTION from '../actions/AccountChangePin.action'

const pin = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PIN_VALUE:
      return action.data
    default:
      return state
  }
}

const error = (state = '', action) => {
  switch (action.type) {
    case ACTION.SHOW_PIN_CHANGE_ERROR:
      return action.data
    case ACTION.CLEAR_PIN_CHANGE_ERROR:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  pin,
  error
})
