import { signupUser } from '../Signup.middleware'
import {
  changePasswordValue,
  passwordNotificationHide
} from './Password.action'

/* eslint-disable standard/no-callback-literal */
export const checkPassword = (
  password,
  passwordRepeat,
  validation,
  username,
  pinNumber,
  callback
) => {
  return (dispatch, getState, imports) => {
    const t = imports.t

    imports.abcContext(context => {
      const check = context.checkPasswordRules(password)
      if (!check.passed) {
        return callback({
          type: 'password',
          message: t('activity_signup_insufficient_password')
        })
      }
      if (password !== passwordRepeat) {
        return callback({
          type: 'passwordRepeat',
          message: 'Password does not match'
        })
      }
      if (check.passed && password === passwordRepeat) {
        return dispatch(signupUser(username, password, pinNumber, callback))
      } else {
        return callback({
          type: 'password',
          message: t('activity_signup_insufficient_password')
        })
      }
    })
  }
}

export const skipPassword = (username, pinNumber, callback) => {
  return (dispatch, getState, imports) => {
    dispatch(changePasswordValue(''))
    dispatch(passwordNotificationHide())
    return dispatch(signupUser(username, null, pinNumber, callback))
  }
}
