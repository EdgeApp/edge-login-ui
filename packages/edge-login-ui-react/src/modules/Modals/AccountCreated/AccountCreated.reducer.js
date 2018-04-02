import {
  CLOSE_ACCOUNT_CREATED_MODAL,
  OPEN_ACCOUNT_CREATED_MODAL
} from './AccountCreated.action.js'

export const accountCreated = (state = false, action) => {
  switch (action.type) {
    case OPEN_ACCOUNT_CREATED_MODAL:
      return true
    case CLOSE_ACCOUNT_CREATED_MODAL:
      return false
    default:
      return state
  }
}
