import { pinChanged, hidePinView, showPinChangedNotification } from './ChangePin.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'

export const checkPin = ( password, pin, account, callback ) => {
  return ( dispatch, getState, imports ) => {
    const abcContext = imports.abcContext
    const t = imports.t

    if(!account.checkPassword(password)){
      return dispatch(openErrorModal(t('server_error_bad_password')))
    }

    if(account.checkPassword(password)){
      account.changePIN(pin, error => {
        if(error){
          return dispatch(openErrorModal(t('server_error_no_connection')))
        }
        if(!error){
          dispatch(hidePinView())
          dispatch(pinChanged())
          return dispatch(showPinChangedNotification())
        }
      })
    }

  }
}
