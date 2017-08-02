export const OPEN_PASSWORD_RECOVERY_MODAL = 'OPEN_PASSWORD_RECOVERY_MODAL'
export const CLOSE_PASSWORD_RECOVERY_MODAL = 'CLOSE_PASSWORD_RECOVERY_MODAL'

export function openPasswordRecoveryModal () {
  return {
    type: OPEN_PASSWORD_RECOVERY_MODAL
  }
}

export function closePasswordRecoveryModal () {
  return {
    type: CLOSE_PASSWORD_RECOVERY_MODAL
  }
}
