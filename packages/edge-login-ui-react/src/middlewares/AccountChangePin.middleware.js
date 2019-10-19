import { closeLoading, openLoading } from '../actions/Loader.action'
import { errorHandling } from '../lib/helper'

export const checkAndChangePin = (pin, account, callback) => {
  return (dispatch, _, imports) => {
    const t = imports.t
    dispatch(openLoading())
    if (pin.length !== 4) {
      dispatch(closeLoading())
      return callback(t('error_pin_length'))
    }
    return account
      .changePin({ pin })
      .then(() => {
        dispatch(closeLoading())
        return callback(null)
      })
      .catch(error => {
        dispatch(closeLoading())
        return callback(t(errorHandling(error.name)), null)
      })
  }
}
