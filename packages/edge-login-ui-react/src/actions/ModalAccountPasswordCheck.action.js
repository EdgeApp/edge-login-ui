export const ACCOUNT_PASSWORD_CHECK_MODAL_PASSWORD =
  'ACCOUNT_PASSWORD_CHECK_MODAL_PASSWORD'
export const OPEN_ACCOUNT_PASSWORD_CHECK_MODAL =
  'OPEN_ACCOUNT_PASSWORD_CHECK_MODAL'
export const CLOSE_ACCOUNT_PASSWORD_CHECK_MODAL =
  'CLOSE_ACCOUNT_PASSWORD_CHECK_MODAL'
export const ERROR_ACCOUNT_PASSWORD_CHECK_MODAL =
  'ERROR_ACCOUNT_PASSWORD_CHECK_MODAL'
export const CLEAR_ACCOUNT_PASSWORD_CHECK_MODAL =
  'CLEAR_ACCOUNT_PASSWORD_CHECK_MODAL'

export function changeAccountPasswordCheckModalPassword (data) {
  return {
    type: ACCOUNT_PASSWORD_CHECK_MODAL_PASSWORD,
    data
  }
}

export function openAccountPasswordCheckModal (data) {
  return {
    type: OPEN_ACCOUNT_PASSWORD_CHECK_MODAL,
    data
  }
}

export function closeAccountPasswordCheckModal () {
  return {
    type: CLOSE_ACCOUNT_PASSWORD_CHECK_MODAL
  }
}

export function errorAccountPasswordCheckModal (data) {
  return {
    type: ERROR_ACCOUNT_PASSWORD_CHECK_MODAL,
    data
  }
}

export function clearAccountPasswordCheckModal () {
  return {
    type: CLEAR_ACCOUNT_PASSWORD_CHECK_MODAL
  }
}
