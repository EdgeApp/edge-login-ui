import { CLOSE_SUCCESS_MODAL, OPEN_SUCCESS_MODAL } from './Success.action.js'

export const success = (state = false, action) => {
  switch (action.type) {
    case OPEN_SUCCESS_MODAL:
      return true
    case CLOSE_SUCCESS_MODAL:
      return false
    default:
      return state
  }
}
