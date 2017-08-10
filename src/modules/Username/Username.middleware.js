import { openLoading, closeLoading } from '../Loader/Loader.action'
import showCoreError from '../../services/errorHandler.js'

export const checkUsername = (username, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    const abcContext = imports.abcContext
    dispatch(openLoading(t('activity_signup_checking_username')))
    abcContext(context => {
      context.usernameAvailable(username).then(available => {
        dispatch(closeLoading())
        if (!available) {
          return callback(t('activity_signup_username_unavailable'))
        }
        if (available) {
          return callback(null)
        }
      }).catch(e => {
        dispatch(closeLoading())
        return showCoreError(e, dispatch)
      })
    })
  }
}
