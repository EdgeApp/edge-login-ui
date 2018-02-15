import * as ACTION from './PinNumber.action'
import { GET_DETAILS } from '../ReviewDetails/ReviewDetails.action'

export const pin = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PIN_NUMBER_VALUE:
      return action.data
    case GET_DETAILS :
      return ''
    default:
      return state
  }
}

export const pinDummy = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PIN_NUMBER_VALUE:
      const len = action.data.length
      let retval = ''
      for (let i = 0; i < len; i++) {
        retval += '·'
      }
      return retval
    case GET_DETAILS :
      return ''
    default:
      return state
  }
}
