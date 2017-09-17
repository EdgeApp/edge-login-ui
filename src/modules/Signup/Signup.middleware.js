import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'
import { loginWithPassword } from '../Login/Login.middleware.js'

export const signupUser = (username, password, pin, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    const abcContext = imports.abcContext
    dispatch(openLoading(t('fragment_signup_creating_account')))
    abcContext(ctx => {
      ctx.createAccount(username, password, pin, undefined, (err, result) => {
        dispatch(closeLoading())
        if (err) {
          return dispatch(openErrorModal(t('activity_signup_failed') + ': ' + err.message))
        }
        if (!err) {
          return dispatch(
            loginWithPassword(
              username,
              password,
              callback
            )
          )
        }
      })
    })
  }
}