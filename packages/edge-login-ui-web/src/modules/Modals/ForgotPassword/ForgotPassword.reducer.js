import {
  OPEN_FORGOT_PASSWORD_MODAL,
  CLOSE_FORGOT_PASSWORD_MODAL
} from './ForgotPassword.action.js'

export const forgotPassword = (state = false, action) => {
  switch (action.type) {
    case OPEN_FORGOT_PASSWORD_MODAL:
      return true
    case CLOSE_FORGOT_PASSWORD_MODAL:
      return false
    default:
      return state
  }
}
