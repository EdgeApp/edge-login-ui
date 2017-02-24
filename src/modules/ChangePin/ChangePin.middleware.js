import { pinChanged, hidePinView, showPinChangedNotification } from './ChangePin.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'

export const checkPin = (password, pin, account, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    dispatch(openLoading())

    if (!account.checkPassword(password)) {
      dispatch(closeLoading())
      return dispatch(openErrorModal(t('server_error_bad_password')))
    }

    if (pin.length !== 4) {
      dispatch(closeLoading())
      return dispatch(openErrorModal(t('activity_change_pin_length')))
    }

    if (account.checkPassword(password)) {
      account.changePIN(pin, error => {
        dispatch(closeLoading())
        if (error) {
          return dispatch(openErrorModal(t('server_error_no_connection')))
        }
        if (!error) {
          dispatch(hidePinView())
          dispatch(pinChanged())
          return dispatch(showPinChangedNotification())
        }
      })
    }
  }
}
