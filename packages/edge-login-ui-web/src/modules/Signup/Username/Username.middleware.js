import { closeLoading, openLoading } from '../../Loader/Loader.action'

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
      })
    })
  }
}
