export const SHOW_DETAILS = 'SHOW_DETAILS'
export const HIDE_DETAILS = 'HIDE_DETAILS'
export const GET_DETAILS = 'GET_DETAILS'
export const SHOW_PASSWORD_RECOVERY_AFTER_REVIEW =
  'SHOW_PASSWORD_RECOVERY_AFTER_REVIEW'
export const HIDE_PASSWORD_RECOVERY_AFTER_REVIEW =
  'HIDE_PASSWORD_RECOVERY_AFTER_REVIEW'

export function showSignInDetails () {
  return {
    type: SHOW_DETAILS
  }
}

export function hideSignInDetails () {
  return {
    type: HIDE_DETAILS
  }
}

export function showPasswordRecovery () {
  return {
    type: SHOW_PASSWORD_RECOVERY_AFTER_REVIEW
  }
}

export function hidePasswordRecovery () {
  return {
    type: HIDE_PASSWORD_RECOVERY_AFTER_REVIEW
  }
}

export function getDetails (data) {
  return {
    type: GET_DETAILS,
    data
  }
}
