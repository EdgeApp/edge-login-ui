import { combineReducers } from 'redux'

import { CLOSE_SUCCESS_MODAL, OPEN_SUCCESS_MODAL } from './Success.action.js'

const modal = (state = false, action) => {
  switch (action.type) {
    case OPEN_SUCCESS_MODAL:
      return true
    case CLOSE_SUCCESS_MODAL:
      return false
    default:
      return state
  }
}

const message = (state = '', action) => {
  switch (action.type) {
    case OPEN_SUCCESS_MODAL:
      return action.message
    case CLOSE_SUCCESS_MODAL:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  modal,
  message
})
