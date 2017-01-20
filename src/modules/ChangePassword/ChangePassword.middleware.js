import { passwordChanged, hidePasswordView} from './ChangePassword.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
// import { signupUser } from '../Signup/Signup.middleware'

export const checkPassword = ( oldPassword, newPassword, newPasswordRepeat, validation, callback ) => {
  return ( dispatch, getState, imports ) => {
    const abcContext = imports.abcContext
    const t = imports.t
    if (!validation.upperCaseChar || !validation.lowerCaseChar || !validation.number || !validation.characterLength) {
      return dispatch(openErrorModal(t('activity_signup_insufficient_password')))
    }
    if (newPassword !== newPasswordRepeat) {
      return dispatch(openErrorModal(t('activity_signup_passwords_dont_match')))
    }
    if (validation.upperCaseChar && validation.lowerCaseChar && validation.number && validation.characterLength && newPassword === newPasswordRepeat) {
      dispatch(passwordChanged())
      return dispatch(hidePasswordView())
    } else {
      return dispatch(openErrorModal(t('activity_signup_insufficient_password')))
    }

  }
}

