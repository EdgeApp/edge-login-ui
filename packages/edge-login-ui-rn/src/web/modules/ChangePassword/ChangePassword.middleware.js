import { passwordChanged, hidePasswordView, showPasswordChangedNotification } from './ChangePassword.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'

export const checkPassword = (oldPassword, newPassword, newPasswordRepeat, validation, account, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    dispatch(openLoading())

    imports.abcContext(context => {
      const check = context.checkPasswordRules(newPassword)

      if (!check.passed) {
        dispatch(closeLoading())
        return dispatch(openErrorModal(t('activity_signup_insufficient_password')))
      }

      if (newPassword !== newPasswordRepeat) {
        dispatch(closeLoading())
        return dispatch(openErrorModal(t('activity_signup_passwords_dont_match')))
      }

      if (check.passed && newPassword === newPasswordRepeat) {
        account.checkPassword(oldPassword).then(passwordIsGood => {
          if (!passwordIsGood) {
            dispatch(closeLoading())
            return dispatch(openErrorModal(t('server_error_bad_password')))
          }
          return account.changePassword(newPassword, error => {
            dispatch(closeLoading())
            if (error) {
              return dispatch(openErrorModal(t('server_error_no_connection')))
            }

            dispatch(passwordChanged())
            dispatch(hidePasswordView())
            return dispatch(showPasswordChangedNotification())
          })
        })
      } else {
        dispatch(closeLoading())
        return dispatch(openErrorModal(t('activity_signup_insufficient_password')))
      }
    })
  }
}
