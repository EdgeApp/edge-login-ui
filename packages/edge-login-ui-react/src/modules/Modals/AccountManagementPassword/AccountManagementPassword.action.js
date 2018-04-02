export const ACCOUNT_MANAGEMENT_PASSWORD_MODAL_PASSWORD =
  'ACCOUNT_MANAGEMENT_PASSWORD_MODAL_PASSWORD'
export const OPEN_ACCOUNT_MANAGEMENT_PASSWORD_MODAL =
  'OPEN_ACCOUNT_MANAGEMENT_PASSWORD_MODAL'
export const CLOSE_ACCOUNT_MANAGEMENT_PASSWORD_MODAL =
  'CLOSE_ACCOUNT_MANAGEMENT_PASSWORD_MODAL'
export const ERROR_ACCOUNT_MANAGEMENT_PASSWORD_MODAL =
  'ERROR_ACCOUNT_MANAGEMENT_PASSWORD_MODAL'
export const CLEAR_ACCOUNT_MANAGEMENT_PASSWORD_MODAL =
  'CLEAR_ACCOUNT_MANAGEMENT_PASSWORD_MODAL'

export function changeAccountManagementPasswordModalPassword (data) {
  return {
    type: ACCOUNT_MANAGEMENT_PASSWORD_MODAL_PASSWORD,
    data
  }
}

export function openAccountManagementModal (data) {
  return {
    type: OPEN_ACCOUNT_MANAGEMENT_PASSWORD_MODAL,
    data
  }
}

export function closeAccountManagementModal () {
  return {
    type: CLOSE_ACCOUNT_MANAGEMENT_PASSWORD_MODAL
  }
}

export function errorAccountManagementModal (data) {
  return {
    type: ERROR_ACCOUNT_MANAGEMENT_PASSWORD_MODAL,
    data
  }
}

export function clearAccountManagementModal () {
  return {
    type: CLEAR_ACCOUNT_MANAGEMENT_PASSWORD_MODAL
  }
}
