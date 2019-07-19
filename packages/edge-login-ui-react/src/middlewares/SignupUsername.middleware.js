import { closeLoading, openLoading } from '../actions/Loader.action'
import { errorHandling } from '../lib/helper'

export const checkUsername = (username, callback) => {
  return (dispatch, _, imports) => {
    const t = imports.t
    const { usernameAvailable } = window.abcui.abcuiContext
    dispatch(openLoading(t('loading_signup_checking_username')))

    usernameAvailable(username)
      .then(available => {
        dispatch(closeLoading())
        if (!available) {
          return callback(t('error_signup_username_unavailable'))
        }
        return callback(null)
      })
      .catch(error => {
        dispatch(closeLoading())
        return callback(t(errorHandling(error.name)))
      })
  }
}
