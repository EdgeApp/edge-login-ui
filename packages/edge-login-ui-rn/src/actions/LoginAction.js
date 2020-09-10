// @flow

import s from '../common/locales/strings.js'
import { loginWithTouchId } from '../keychain.js'
import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'
import { translateError } from '../util/ErrorMessageUtil.js'
import { completeLogin } from './LoginCompleteActions.js'

/**
 * Make it Thunky
 */
export function loginWithRecovery(
  answers: Array<string>,
  otpBackUpKey?: string
) {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const backupKey = state.passwordRecovery.recoveryKey || ''
    const username = state.login.username
    const { context } = imports
    try {
      const account = await context.loginWithRecovery2(
        backupKey,
        username,
        answers,
        {
          ...imports.accountOptions,
          otp: otpBackUpKey
        }
      )
      dispatch(completeLogin(account))
    } catch (e) {
      if (e.name === 'OtpError') {
        dispatch({
          type: 'OTP_ERROR',
          data: {
            error: e,
            loginAttempt: 'RECOVERY',
            loginAttemptData: answers
          }
        })
        return
      }
      console.log(e.message)
      const incorrect = 'The answers you provided are incorrect. '
      dispatch({ type: 'ON_RECOVERY_LOGIN_ERROR', data: incorrect })
    }
  }
}

export function retryWithOtp() {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    dispatch({ type: 'START_RECOVERY_LOGIN' })
    const state = getState()
    const {
      otpUserBackupKey,
      password,
      pin,
      previousAttemptData,
      previousAttemptType,
      username
    } = state.login

    switch (previousAttemptType) {
      case 'RECOVERY':
        dispatch(loginWithRecovery(previousAttemptData, otpUserBackupKey))
        return
      case 'PASSWORD':
        dispatch(userLogin({ username, password }, otpUserBackupKey))
        return
      case 'PIN':
        dispatch(userLoginWithPin({ username, pin }, otpUserBackupKey))
    }
  }
}
export function userLoginWithTouchId(data: Object) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { context, folder } = imports
    const startFunction = () => {
      dispatch({ type: 'AUTH_LOGGING_IN_WITH_PIN' })
    }
    loginWithTouchId(
      context,
      folder,
      data.username,
      'Touch to login user: `' + data.username + '`',
      s.strings.login_with_password,
      imports.accountOptions,
      startFunction
    )
      .then(async account => {
        if (account) {
          dispatch(completeLogin(account))
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
export function userLoginWithPin(data: Object, backupKey?: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { callback, context } = imports
    const myAccountOptions = {
      ...imports.accountOptions
    }
    if (backupKey) {
      myAccountOptions.otp = backupKey
    }
    dispatch({ type: 'AUTH_UPDATE_PIN', data: data.pin })
    if (data.pin.length === 4) {
      setTimeout(async () => {
        try {
          const abcAccount = await context.loginWithPIN(
            data.username,
            data.pin,
            myAccountOptions
          )
          dispatch(completeLogin(abcAccount))
        } catch (e) {
          console.log('LOG IN WITH PIN ERROR ', e)
          if (e.name === 'OtpError') {
            dispatch({
              type: 'OTP_ERROR',
              data: {
                error: e,
                loginAttempt: 'PIN'
              }
            })
            return
          }
          if (e.message === 'Unexpected end of data') {
            e.message = s.strings.backup_key_incorrect
          }
          const message =
            e.name === 'PasswordError'
              ? s.strings.invalid_pin
              : e.name === 'UsernameError'
              ? s.strings.pin_not_enabled
              : e.message
          dispatch({
            type: 'LOGIN_PIN_FAIL',
            data: {
              message,
              wait: e.wait
            }
          })
          if (e.wait) {
            setTimeout(() => {
              dispatch(processWait(message))
            }, 1000)
          }
          callback(e.message, null)
        }
      }, 300)
    }
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
  }
}
export function processWait(message: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const wait = state.login.wait
    console.log('RL: wait ', wait)
    if (wait > 0) {
      // console.log('RL: got more than 1', wait)
      dispatch({
        type: 'LOGIN_PIN_FAIL',
        data: {
          message,
          wait: wait - 1
        }
      })
      setTimeout(() => {
        dispatch(processWait(message))
      }, 1000)
    }
  }
}

export function userLogin(data: Object, backupKey?: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { callback, context } = imports
    const myAccountOptions = {
      ...imports.accountOptions
    }
    if (backupKey) myAccountOptions.otp = backupKey
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    setTimeout(async () => {
      try {
        const abcAccount = await context.loginWithPassword(
          data.username,
          data.password,
          myAccountOptions
        )
        dispatch(completeLogin(abcAccount))
      } catch (e) {
        console.log(e)
        if (e.name === 'OtpError' && !myAccountOptions.otp) {
          dispatch({
            type: 'OTP_ERROR',
            data: {
              error: e,
              loginAttempt: 'PASSWORD'
            }
          })
          return
        }
        const rawMessage = e.message
        if (e.message === 'Unexpected end of data') {
          e.message = s.strings.backup_key_incorrect
        }
        if (e.name === 'OtpError' && myAccountOptions.otp) {
          dispatch({
            type: 'OTP_LOGIN_BACKUPKEY_FAIL',
            data: s.strings.backup_key_incorrect
          })
          return
        }
        if (myAccountOptions.otp) {
          dispatch({
            type: 'OTP_LOGIN_BACKUPKEY_FAIL',
            data: translateError(e.message)
          })
          console.log('stop')
          return
        }
        dispatch(
          dispatch({ type: 'LOGIN_USERNAME_PASSWORD_FAIL', data: rawMessage })
        )
        callback(e.message, null)
      }
    }, 300)
  }
}

export function getEdgeLoginQrCode() {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const context = imports.context
    const myAccountOptions = {
      ...imports.accountOptions,
      displayImageUrl:
        'https://github.com/Airbitz/edge-brand-guide/blob/master/Logo/Mark/Edge-Final-Logo_Mark-Green.png',
      displayName: 'Edge Wallet'
    }
    try {
      const qr = await context.requestEdgeLogin(myAccountOptions)
      console.log(qr)
      dispatch({ type: 'START_EDGE_LOGIN_REQUEST', data: qr })
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      console.log(e)
    }
  }
}
