import { pinChanged } from './ChangePin.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'

export const checkPin = (password, pin, account, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    dispatch(openLoading())

    if (pin.length !== 4) {
      dispatch(closeLoading())
      return dispatch(openErrorModal(t('activity_change_pin_length')))
    }

    account.checkPassword(password).then(passwordIsGood => {
      if (!passwordIsGood) {
        dispatch(closeLoading())
        return dispatch(openErrorModal(t('server_error_bad_password')))
      }

      return account.changePIN(pin, error => {
        dispatch(closeLoading())
        if (error != null) {
          return dispatch(openErrorModal(t('server_error_no_connection')))
        }
        dispatch(pinChanged())
        return callback(null)
      })
    })
  }
}
