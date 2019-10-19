import { closeLoading, openLoading } from '../actions/Loader.action'
import { errorHandling } from '../lib/helper'

export const checkAndChangePassword = (
  password,
  passwordRepeat,
  account,
  callback
) => {
  return (dispatch, _, imports) => {
    dispatch(openLoading())
    const t = imports.t
    const context = window.abcui.abcuiContext
    const check = context.checkPasswordRules(password)
    if (!check.passed) {
      dispatch(closeLoading())
      return callback({
        type: 'password',
        message: t('error_password_insufficient')
      })
    }
    if (password !== passwordRepeat) {
      dispatch(closeLoading())
      return callback({
        type: 'passwordRepeat',
        message: t('error_password_not_match')
      })
    }
    if (check.passed && password === passwordRepeat) {
      account
        .changePassword(password)
        .then(() => {
          dispatch(closeLoading())
          return callback(null)
        })
        .catch(error => {
          dispatch(closeLoading())
          return callback({
            type: 'passwordRepeat',
            message: t(errorHandling(error.name))
          })
        })
    }
  }
}
