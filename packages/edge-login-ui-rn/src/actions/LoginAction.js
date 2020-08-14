// @flow

import { type EdgePendingEdgeLogin } from 'edge-core-js'

import s from '../common/locales/strings.js'
import { loginWithTouchId } from '../keychain.js'
import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'
import { type LoginAttempt, attemptLogin } from '../util/loginAttempt.js'
import { completeLogin } from './LoginCompleteActions.js'

/**
 * Logs the user in, using password, PIN, or recovery.
 * There is no error handling in here, since components do that best.
 */
export const login = (attempt: LoginAttempt, otpKey?: string) => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
): Promise<void> => {
  const { accountOptions, context } = imports

  const account = await attemptLogin(context, attempt, {
    ...accountOptions,
    otp: otpKey, // Legacy property name
    otpKey
  })
  dispatch(completeLogin(account))
}

/**
 * Make it Thunky
 */
export function loginWithRecovery(answers: Array<string>) {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const recoveryKey = state.passwordRecovery.recoveryKey || ''
    const username = state.login.username
    const { context } = imports
    try {
      const account = await context.loginWithRecovery2(
        recoveryKey,
        username,
        answers,
        imports.accountOptions
      )
      dispatch(completeLogin(account))
    } catch (e) {
      if (e.name === 'OtpError') {
        dispatch({
          type: 'OTP_ERROR',
          data: {
            attempt: { type: 'recovery', recoveryKey, username, answers },
            error: e
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
export function userLoginWithPin(data: Object) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { callback, context } = imports
    dispatch({ type: 'AUTH_UPDATE_PIN', data: data.pin })
    if (data.pin.length === 4) {
      setTimeout(async () => {
        try {
          const abcAccount = await context.loginWithPIN(
            data.username,
            data.pin,
            imports.accountOptions
          )
          dispatch(completeLogin(abcAccount))
        } catch (e) {
          console.log('LOG IN WITH PIN ERROR ', e)
          if (e.name === 'OtpError') {
            const { username, pin } = data
            dispatch({
              type: 'OTP_ERROR',
              data: {
                attempt: { type: 'pin', username, pin },
                error: e
              }
            })
            return
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

export function userLogin(data: Object) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { callback, context } = imports
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    setTimeout(async () => {
      try {
        const abcAccount = await context.loginWithPassword(
          data.username,
          data.password,
          imports.accountOptions
        )
        dispatch(completeLogin(abcAccount))
      } catch (e) {
        console.log(e)
        if (e.name === 'OtpError') {
          const { username, password } = data
          dispatch({
            type: 'OTP_ERROR',
            data: {
              attempt: { type: 'password', username, password },
              error: e
            }
          })
          return
        }
        dispatch(
          dispatch({ type: 'LOGIN_USERNAME_PASSWORD_FAIL', data: e.message })
        )
        callback(e.message, null)
      }
    }, 300)
  }
}

export const requestEdgeLogin = () => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
): Promise<EdgePendingEdgeLogin> => {
  const { accountOptions, context } = imports
  return context.requestEdgeLogin({
    ...accountOptions,
    // These are no longer used in recent core versions:
    displayImageUrl:
      'https://github.com/Airbitz/edge-brand-guide/blob/master/Logo/Mark/Edge-Final-Logo_Mark-Green.png',
    displayName: 'Edge Wallet'
  })
}
