import { passwordNotificationHide, changePasswordValue } from './Password.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { signupUser } from '../Signup/Signup.middleware'

export const checkPassword = (password, passwordRepeat, validation, username, pinNumber, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t

    imports.abcContext(context => {
      const check = context.checkPasswordRules(password)
      if (!check.passed) {
        return dispatch(openErrorModal(t('activity_signup_insufficient_password')))
      }
      if (password !== passwordRepeat) {
        return dispatch(openErrorModal(t('activity_signup_passwords_dont_match')))
      }
      if (check.passed && password === passwordRepeat) {
        return dispatch(
          signupUser(username, password, pinNumber, callback)
        )
      } else {
        return dispatch(openErrorModal(t('activity_signup_insufficient_password')))
      }
    })
  }
}

export const skipPassword = (username, pinNumber, callback) => {
  return (dispatch, getState, imports) => {
    dispatch(changePasswordValue(''))
    dispatch(passwordNotificationHide())
    return dispatch(
      signupUser(username, null, pinNumber, callback)
    )
  }
}
