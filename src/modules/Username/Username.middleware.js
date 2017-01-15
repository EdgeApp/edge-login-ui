import { openLoading, closeLoading } from '../Loader/Loader.action'

export const checkUsername = (username,callback) => {
  return (dispatch,getState,t,abcContext) => {
    dispatch(openLoading(t('activity_signup_checking_username')))
    setTimeout(() => {
      abcContext(context => {
        context.usernameAvailable(username, function (err, available) {
          dispatch(closeLoading())
          if (err) {
            dispatch(openErrorModal(t('activity_signup_username_unavailable')))
            return callback()
          }
          Promise.resolve(true)
        })
      })
    }, 300)
  }
}
