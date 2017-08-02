import { OPEN_ACCOUNT_MANAGEMENT_PASSWORD_MODAL, CLOSE_ACCOUNT_MANAGEMENT_PASSWORD_MODAL } from './AccountManagementPassword.action.js'

export const accountManagementPassword = (state = false, action) => {
  switch (action.type) {
    case OPEN_ACCOUNT_MANAGEMENT_PASSWORD_MODAL :
      return true
    case CLOSE_ACCOUNT_MANAGEMENT_PASSWORD_MODAL :
      return false
    default:
      return state
  }
}
