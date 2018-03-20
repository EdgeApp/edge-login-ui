import * as ACTION from './AccountManagementPassword.action.js'

export const password = (state = '', action) => {
  switch (action.type) {
    case ACTION.ACCOUNT_MANAGEMENT_PASSWORD_MODAL_PASSWORD:
      return action.data
    default:
      return state
  }
}

export const view = (state = false, action) => {
  switch (action.type) {
    case ACTION.OPEN_ACCOUNT_MANAGEMENT_PASSWORD_MODAL:
      return true
    case ACTION.CLOSE_ACCOUNT_MANAGEMENT_PASSWORD_MODAL:
      return false
    default:
      return state
  }
}

export const route = (state = '', action) => {
  switch (action.type) {
    case ACTION.OPEN_ACCOUNT_MANAGEMENT_PASSWORD_MODAL:
      return action.data
    case ACTION.CLOSE_ACCOUNT_MANAGEMENT_PASSWORD_MODAL:
      return ''
    default:
      return state
  }
}

export const error = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_ACCOUNT_MANAGEMENT_PASSWORD_MODAL:
      return action.data
    case ACTION.CLEAR_ACCOUNT_MANAGEMENT_PASSWORD_MODAL:
      return ''
    default:
      return state
  }
}
