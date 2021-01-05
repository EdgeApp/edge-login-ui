// @flow

import { type EdgePendingEdgeLogin } from 'edge-core-js'
import * as React from 'react'

import s from '../common/locales/strings.js'
import { TextInputModal } from '../components/modals/TextInputModal.js'
import { Airship, showError } from '../components/services/AirshipInstance.js'
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

export function loginWithTouch(username: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { context, folder } = imports
    const startFunction = () => {
      dispatch({ type: 'AUTH_LOGGING_IN_WITH_PIN' })
    }
    loginWithTouchId(
      context,
      folder,
      username,
      `Touch to login user: "${username}"`,
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
export function loginWithPin(username: string, pin: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { callback, context } = imports
    setTimeout(async () => {
      try {
        const abcAccount = await context.loginWithPIN(
          username,
          pin,
          imports.accountOptions
        )
        dispatch(completeLogin(abcAccount))
      } catch (e) {
        console.log('LOG IN WITH PIN ERROR ', e)
        if (e.name === 'OtpError') {
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
            : e.name === 'NetworkError'
            ? `${e.message} ${s.strings.pin_network_error_full_password}`
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

/**
 * Ask the user for the username that goes with a recovery key,
 * then launches the questions scene.
 */
export const launchPasswordRecovery = (recoveryKey: string) => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  const { context } = imports

  async function handleSubmit(username: string): Promise<string | void> {
    try {
      const questions = await context.fetchRecovery2Questions(
        recoveryKey,
        username
      )
      dispatch({ type: 'AUTH_UPDATE_USERNAME', data: username })
      dispatch({
        type: 'ON_RECOVERY_LOGIN_IS_ENABLED',
        data: { recoveryKey, userQuestions: questions }
      })
    } catch (error) {
      if (error == null) throw new Error('Unknown error')
      if (error.name === 'UsernameError') {
        showError(s.strings.recovery_by_username_error)
        return ''
      }
      throw error
    }
  }

  Airship.show(bridge => (
    <TextInputModal
      bridge={bridge}
      onSubmit={handleSubmit}
      title={s.strings.password_recovery}
      message={s.strings.recover_by_username}
      inputLabel={s.strings.username}
    />
  ))
}
