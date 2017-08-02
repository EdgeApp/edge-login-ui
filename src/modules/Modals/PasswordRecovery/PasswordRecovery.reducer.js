import { OPEN_PASSWORD_RECOVERY_MODAL, CLOSE_PASSWORD_RECOVERY_MODAL } from './PasswordRecovery.action.js'

export const passwordRecovery = (state = false, action) => {
  switch (action.type) {
    case OPEN_PASSWORD_RECOVERY_MODAL :
      return true
    case CLOSE_PASSWORD_RECOVERY_MODAL :
      return false
    default:
      return state
  }
}
