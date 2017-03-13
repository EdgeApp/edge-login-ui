import * as ACTION from './ErrorModal.action'

export const visible = (state = false, action) => {
  switch (action.type) {
    case ACTION.ERROR_MODAL_OPEN :
      return true

    case ACTION.ERROR_MODAL_CLOSE :
      return false

    default:
      return state
  }
}

export const message = (state = '', action) => {  
  switch (action.type) {
    case ACTION.ERROR_MODAL_OPEN :
      switch (action.error.type) {
        case 'OtpError':
          return "This account has Two Factor Authentication enabled and cannot be logged in using a username and password. Please login by scanning the barcode with the Airbitz Wallet."
        case 'PasswordError':
          return "Invalid password."
        default:
          return action.message
          return action.error.message
          return action.error
      }


    case ACTION.ERROR_MODAL_CLOSE :
      return ''

    default:
      return state
  }
}
