import { closeLoading, openLoading } from '../Loader/Loader.action'
import { userLogin } from '../Login/Login.action.js'

export const signupUser = (username, password, pin, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    dispatch(openLoading(t('fragment_signup_creating_account')))

    const ctx = window.abcui.abcuiContext
    ctx
      .createAccount(username, password, pin)
      .then(account => {
        localStorage.setItem('lastUser', username)
        dispatch(userLogin(account))
        dispatch(closeLoading())
        callback(null, account)
      })
      .catch(e => {
        dispatch(closeLoading())
      })
  }
}
