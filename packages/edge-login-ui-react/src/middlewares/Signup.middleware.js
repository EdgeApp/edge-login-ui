import { closeLoading, openLoading } from '../actions/Loader.action'
import { userLogin } from '../actions/Login.action.js'
import { errorHandling, lastUser } from '../lib/helper'

export const signupUser = (username, password, pin, callback) => {
  return (dispatch, _, imports) => {
    const t = imports.t
    dispatch(openLoading(t('loading_signup_creating_account')))
    const ctx = window.abcui.abcuiContext
    const accountOptions = window.abcui.accountOptions
    ctx
      .createAccount(username, password, pin, accountOptions)
      .then(account => {
        window.localStorage.setItem(lastUser, username)
        dispatch(userLogin(account))
        dispatch(closeLoading())
        callback(null, account)
      })
      .catch(error => {
        dispatch(closeLoading())
        return callback(t(errorHandling(error.name)), null)
      })
  }
}
