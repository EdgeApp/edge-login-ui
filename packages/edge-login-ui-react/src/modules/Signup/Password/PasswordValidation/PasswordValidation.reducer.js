import { PASSWORD_CHANGED } from '../../../AccountManagement/ChangePassword/ChangePassword.action'
import { GET_DETAILS } from '../../ReviewDetails/ReviewDetails.action'
import * as ACTION from './PasswordValidation.action'

export const upperCaseChar = (state = false, action) => {
  switch (action.type) {
    case ACTION.UPPER_CASE_PASS:
      return true

    case ACTION.UPPER_CASE_FAIL:
      return false

    case PASSWORD_CHANGED:
      return false

    case GET_DETAILS:
      return false

    default:
      return state
  }
}

export const passwordValid = (state = false, action) => {
  switch (action.type) {
    case ACTION.VALIDATE_PASSWORD:
      return true

    case ACTION.INVALIDATE_PASSWORD:
      return false

    case PASSWORD_CHANGED:
      return false

    case GET_DETAILS:
      return false

    default:
      return state
  }
}

export const lowerCaseChar = (state = false, action) => {
  switch (action.type) {
    case ACTION.LOWER_CASE_PASS:
      return true

    case ACTION.LOWER_CASE_FAIL:
      return false

    case PASSWORD_CHANGED:
      return false

    case GET_DETAILS:
      return false

    default:
      return state
  }
}

export const number = (state = false, action) => {
  switch (action.type) {
    case ACTION.NUMBER_PASS:
      return true

    case ACTION.NUMBER_FAIL:
      return false

    case PASSWORD_CHANGED:
      return false

    case GET_DETAILS:
      return false

    default:
      return state
  }
}

export const characterLength = (state = false, action) => {
  switch (action.type) {
    case ACTION.CHARACTER_LENGTH_PASS:
      return true

    case ACTION.CHARACTER_LENGTH_FAIL:
      return false

    case PASSWORD_CHANGED:
      return false

    case GET_DETAILS:
      return false

    default:
      return state
  }
}

export const timeToCrackPassword = (state = 0, action) => {
  switch (action.type) {
    case ACTION.TIME_TO_CRACK_PASSWORD:
      return action.data

    case PASSWORD_CHANGED:
      return false

    case GET_DETAILS:
      return false

    default:
      return state
  }
}
