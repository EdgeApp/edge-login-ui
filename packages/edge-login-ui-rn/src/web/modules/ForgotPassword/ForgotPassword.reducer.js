import * as ACTION from './ForgotPassword.action'

export const visible = (state = false, action) => {
  switch (action.type) {
    case ACTION.FORGOT_PASSWORD_MODAL_OPEN :
      return true

    case ACTION.FORGOT_PASSWORD_MODAL_CLOSE :
      return false

    default:
      return state
  }
}
