import { openLoading, closeLoading } from '../Loader/Loader.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'

export const checkUsername = (username, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    const abcContext = imports.abcContext
    dispatch(openLoading(t('activity_signup_checking_username')))
    abcContext(context => {
      context.usernameAvailable(username, function (err, available) {
        dispatch(closeLoading())
        if (err) {
          return dispatch(openErrorModal(t('activity_signup_username_unavailable')))
        }
        if (!err) {
          return callback()
        }
      })
    })
  }
}
