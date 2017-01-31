import { passwordChanged, hidePasswordView, notifySuccessPasswordChanged} from './ChangePassword.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
// import { signupUser } from '../Signup/Signup.middleware'

export const checkPassword = ( oldPassword, newPassword, newPasswordRepeat, validation, account, callback ) => {
  return ( dispatch, getState, imports ) => {
    const abcContext = imports.abcContext
    const t = imports.t

    if (!account.checkPassword(oldPassword)) {
      return dispatch(openErrorModal(t('server_error_bad_password')))
    }

    if (!validation.upperCaseChar || !validation.lowerCaseChar || !validation.number || !validation.characterLength) {
      return dispatch(openErrorModal(t('activity_signup_insufficient_password')))
    }

    if (newPassword !== newPasswordRepeat) {
      return dispatch(openErrorModal(t('activity_signup_passwords_dont_match')))
    }


    if (validation.upperCaseChar &&
        validation.lowerCaseChar &&
        validation.number &&
        validation.characterLength &&
        newPassword === newPasswordRepeat &&
        account.checkPassword(oldPassword)
    ) {
      account.changePassword(newPassword, error =>{
        if(error){
          return dispatch(openErrorModal(t('server_error_no_connection')))
        }
        if(!error){
          dispatch(passwordChanged())
          dispatch(hidePasswordView())
          return dispatch(notifySuccessPasswordChanged())
        }
      })
    } else {
      return dispatch(openErrorModal(t('activity_signup_insufficient_password')))
    }

  }
}
