export const FORGOT_PASSWORD_MODAL_OPEN   = 'FORGOT_PASSWORD_MODAL_OPEN'
export const FORGOT_PASSWORD_MODAL_CLOSE  = 'FORGOT_PASSWORD_MODAL_CLOSE'

export function openForgotPasswordModal () {
  return {
    type: FORGOT_PASSWORD_MODAL_OPEN 
  }
}

export function closeForgotPasswordModal () {
  return {
    type: FORGOT_PASSWORD_MODAL_CLOSE
  }
}
