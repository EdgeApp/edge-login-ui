import { closeLoading, openLoading } from '../Loader/Loader.action'
import { userLogin } from '../Login/Login.action.js'
import { errorHandling } from '../Login/Login.middleware.js'

export const signupUser = (username, password, pin, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    dispatch(openLoading(t('fragment_signup_creating_account')))

    const ctx = window.abcui.abcuiContext
    const accountOptions = window.abcui.accountOptions
    ctx
      .createAccount(username, password, pin, accountOptions)
      .then(account => {
        dispatch(closeLoading())
        localStorage.setItem('lastUser', username)
        dispatch(userLogin(account))
        callback(null, account)
      })
      .catch(error => {
        dispatch(closeLoading())
        return callback(t(errorHandling(error.name)), null)
      })
  }
}
