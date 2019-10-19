import {
  CLOSE_PASSWORD_RECOVERY_SUCCESS_MODAL,
  OPEN_PASSWORD_RECOVERY_SUCCESS_MODAL
} from '../actions/ModalPasswordRecoverySuccess.action'

export const passwordRecoverySuccess = (state = false, action) => {
  switch (action.type) {
    case OPEN_PASSWORD_RECOVERY_SUCCESS_MODAL:
      return true
    case CLOSE_PASSWORD_RECOVERY_SUCCESS_MODAL:
      return false
    default:
      return state
  }
}
