import * as ACTION from './ReviewDetails.action'
import { HIDE_PASSWORD_RECOVERY_VIEW, SHOW_PASSWORD_RECOVERY_VIEW } from '../PasswordRecovery/PasswordRecovery.action'

const defaultDetails = {
  username: '',
  password: '',
  pin: ''
}

export const details = (state = defaultDetails, action) => {
  switch (action.type) {
    case ACTION.GET_DETAILS:
      return Object.assign({}, state, action.data)

    default:
      return state
  }
}

export const view = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_DETAILS:
      return true

    case ACTION.HIDE_DETAILS:
      return false

    default:
      return state
  }
}

export const afterQuestionPasswordRecoveryView = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_PASSWORD_RECOVERY_AFTER_REVIEW:
      return true

    case HIDE_PASSWORD_RECOVERY_VIEW:
      return true

    case SHOW_PASSWORD_RECOVERY_VIEW:
      return false

    case ACTION.HIDE_PASSWORD_RECOVERY_AFTER_REVIEW:
      return false

    default:
      return state
  }
}
