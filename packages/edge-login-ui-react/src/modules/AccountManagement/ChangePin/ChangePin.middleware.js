import { closeLoading, openLoading } from '../../Loader/Loader.action'
import { pinChanged } from './ChangePin.action'

export const checkPin = (password, pin, account, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    dispatch(openLoading())
    if (pin.length !== 4) {
      dispatch(closeLoading())
      return callback(t('activity_change_pin_length'))
    }
    return account.changePIN(pin, error => {
      dispatch(closeLoading())
      if (error != null) {
        return callback(t('server_error_no_connection'))
      }
      dispatch(pinChanged())
      return callback(null)
    })
  }
}
