import { passwordChanged, hidePasswordView, showPasswordChangedNotification } from './ChangePassword.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'

export const checkPassword = (oldPassword, newPassword, newPasswordRepeat, validation, account, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    dispatch(openLoading())

    if (!validation.upperCaseChar || !validation.lowerCaseChar || !validation.number || !validation.characterLength) {
      dispatch(closeLoading())
      return dispatch(openErrorModal(t('activity_signup_insufficient_password')))
    }

    if (newPassword !== newPasswordRepeat) {
      dispatch(closeLoading())
      return dispatch(openErrorModal(t('activity_signup_passwords_dont_match')))
    }

    if (validation.upperCaseChar &&
        validation.lowerCaseChar &&
        validation.number &&
        validation.characterLength &&
        newPassword === newPasswordRepeat
    ) {
      account.checkPassword(oldPassword).then(result => {
        if(!result){
          console.log(result)
          dispatch(closeLoading())
          return dispatch(openErrorModal(t('server_error_bad_password')))
        }
        if(result){
          console.log(result)
          account.changePassword(newPassword, error => {
            console.log(error)
            dispatch(closeLoading())
            if (error) {
              return dispatch(openErrorModal(t('server_error_no_connection')))
            }
            if (!error) {
              dispatch(passwordChanged())
              dispatch(hidePasswordView())
              return dispatch(showPasswordChangedNotification())
            }
          })
        }
      })
    } else {
      dispatch(closeLoading())
      return dispatch(openErrorModal(t('activity_signup_insufficient_password')))
    }
  }
}
