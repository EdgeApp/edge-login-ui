import { combineReducers } from 'redux'

import * as ACTION from '../actions/Loader.action'

const loading = (state = false, action) => {
  switch (action.type) {
    case ACTION.LOADING_ON:
      return true

    case ACTION.LOADING_OFF:
      return false

    default:
      return state
  }
}

const message = (state = 'Please wait', action) => {
  switch (action.type) {
    case ACTION.LOADING_ON:
      return action.message

    case ACTION.LOADING_OFF:
      return ''

    default:
      return state
  }
}

const style = (state = 'grey', action) => {
  switch (action.type) {
    case ACTION.LOADING_ON:
      return action.style

    default:
      return state
  }
}

export default combineReducers({
  loading,
  message,
  style
})
