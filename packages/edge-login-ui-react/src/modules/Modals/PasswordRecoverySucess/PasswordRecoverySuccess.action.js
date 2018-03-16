export const OPEN_PASSWORD_RECOVERY_SUCCESS_MODAL =
  'OPEN_PASSWORD_RECOVERY_SUCCESS_MODAL'
export const CLOSE_PASSWORD_RECOVERY_SUCCESS_MODAL =
  'CLOSE_PASSWORD_RECOVERY_SUCCESS_MODAL'

export function openPasswordRecoverySuccessModal () {
  return {
    type: OPEN_PASSWORD_RECOVERY_SUCCESS_MODAL
  }
}

export function closePasswordRecoverySuccessModal () {
  return {
    type: CLOSE_PASSWORD_RECOVERY_SUCCESS_MODAL
  }
}
