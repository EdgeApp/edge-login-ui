export const OPEN_FORGOT_PASSWORD_MODAL = 'OPEN_FORGOT_PASSWORD_MODAL'
export const CLOSE_FORGOT_PASSWORD_MODAL = 'CLOSE_FORGOT_PASSWORD_MODAL'

export function openForgotPasswordModal () {
  return {
    type: OPEN_FORGOT_PASSWORD_MODAL
  }
}

export function closeForgotPasswordModal () {
  return {
    type: CLOSE_FORGOT_PASSWORD_MODAL
  }
}
