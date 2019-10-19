import {
  changePasswordValue,
  passwordNotificationHide
} from '../actions/SignupPassword.action'
import { signupUser } from '../middlewares/Signup.middleware'

export const checkPassword = (
  { password, passwordRepeat, username, pinNumber },
  callback
) => {
  return (dispatch, _, imports) => {
    const t = imports.t
    const context = window.abcui.abcuiContext
    const check = context.checkPasswordRules(password)
    if (!check.passed) {
      return callback({
        type: 'password',
        message: t('error_password_insufficient')
      })
    }
    if (password !== passwordRepeat) {
      return callback({
        type: 'passwordRepeat',
        message: t('error_password_not_match')
      })
    }
    if (check.passed && password === passwordRepeat) {
      return dispatch(signupUser(username, password, pinNumber, callback))
    } else {
      return callback({
        type: 'password',
        message: t('error_password_insufficient')
      })
    }
  }
}

export const skipPassword = (username, pinNumber, callback) => {
  return dispatch => {
    dispatch(changePasswordValue(''))
    dispatch(passwordNotificationHide())
    return dispatch(signupUser(username, null, pinNumber, callback))
  }
}
