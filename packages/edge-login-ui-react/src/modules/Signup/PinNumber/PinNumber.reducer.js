import { GET_DETAILS } from '../ReviewDetails/ReviewDetails.action'
import * as ACTION from './PinNumber.action'

export const pin = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PIN_NUMBER_VALUE:
      return action.data
    case GET_DETAILS:
      return ''
    default:
      return state
  }
}

export const error = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_PIN_NUMBER_VALUE:
      return action.data
    case ACTION.CLEAR_ERROR_PIN_NUMBER_VALUE:
      return ''
    default:
      return state
  }
}
