import { closeLoading, openLoading } from '../../Loader/Loader.action'

/* eslint-disable standard/no-callback-literal */
export const checkPassword = (
  newPassword,
  newPasswordRepeat,
  account,
  callback
) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    dispatch(openLoading())

    imports.abcContext(context => {
      const check = context.checkPasswordRules(newPassword)

      if (!check.passed) {
        dispatch(closeLoading())
        return callback({
          type: 'password',
          message: t('activity_signup_insufficient_password')
        })
      }
      if (newPassword !== newPasswordRepeat) {
        dispatch(closeLoading())
        return callback({
          type: 'passwordRepeat',
          message: t('activity_signup_passwords_dont_match')
        })
      }
      if (check.passed && newPassword === newPasswordRepeat) {
        account.changePassword(newPassword, error => {
          dispatch(closeLoading())
          if (error) {
            return callback({
              type: 'passwordRepeat',
              message: t('server_error_no_connection')
            })
          }
          if (!error) {
            return callback(null)
          }
        })
      }
    })
  }
}
