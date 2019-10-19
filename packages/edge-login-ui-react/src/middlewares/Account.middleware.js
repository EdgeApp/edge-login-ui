import { closeLoading, openLoading } from '../actions/Loader.action'
import { errorHandling } from '../lib/helper'

export const checkPassword = (password, account, callback) => {
  return (dispatch, _, imports) => {
    const t = imports.t
    dispatch(openLoading())
    account
      .checkPassword(password)
      .then(validate => {
        dispatch(closeLoading())
        if (!validate) {
          return dispatch(callback(t('error_password_incorrect')))
        }
        if (validate) {
          return dispatch(callback(null))
        }
      })
      .catch(error => {
        dispatch(closeLoading())
        return callback(t(errorHandling(error.name)), null)
      })
  }
}
