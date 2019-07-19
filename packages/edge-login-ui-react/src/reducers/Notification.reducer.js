import { combineReducers } from 'redux'

import {
  CLOSE_NOTIFICATION,
  OPEN_NOTIFICATION
} from '../actions/Notification.action'

const view = (state = false, action) => {
  switch (action.type) {
    case OPEN_NOTIFICATION:
      return true
    case CLOSE_NOTIFICATION:
      return false
    default:
      return state
  }
}

const message = (state = '', action) => {
  switch (action.type) {
    case OPEN_NOTIFICATION:
      return action.message
    case CLOSE_NOTIFICATION:
      return ''
    default:
      return state
  }
}

const theme = (state = 'error', action) => {
  switch (action.type) {
    case OPEN_NOTIFICATION:
      return action.theme
    default:
      return state
  }
}

export default combineReducers({
  view,
  message,
  theme
})
