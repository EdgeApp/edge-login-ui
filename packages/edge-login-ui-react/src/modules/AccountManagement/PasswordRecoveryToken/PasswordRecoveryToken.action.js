export const PASSWORD_RECOVERY_TOKEN = 'PASSWORD_RECOVERY_TOKEN'
export const CHANGE_PASSWORD_RECOVERY_EMAIL = 'CHANGE_PASSWORD_RECOVERY_EMAIL'
export const ERROR_PASSWORD_RECOVERY_EMAIL = 'ERROR_PASSWORD_RECOVERY_EMAIL'
export const CLEAR_PASSWORD_RECOVERY_EMAIL = 'CLEAR_PASSWORD_RECOVERY_EMAIL'
export const DONE_PASSWORD_RECOVERY_TOKEN = 'DONE_PASSWORD_RECOVERY_TOKEN'

export function setPasswordRecoveryToken (data) {
  return {
    type: PASSWORD_RECOVERY_TOKEN,
    data
  }
}

export function changePasswordRecoveryEmail (data) {
  return {
    type: CHANGE_PASSWORD_RECOVERY_EMAIL,
    data
  }
}

export function errorPasswordRecoveryEmail (data) {
  return {
    type: ERROR_PASSWORD_RECOVERY_EMAIL,
    data
  }
}

export function clearPasswordRecoveryEmail () {
  return {
    type: CLEAR_PASSWORD_RECOVERY_EMAIL
  }
}

export function finishPasswordRecoveryToken () {
  return {
    type: DONE_PASSWORD_RECOVERY_TOKEN
  }
}
