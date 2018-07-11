// @flow

import {
  enableTouchId,
  isTouchDisabled,
  isTouchEnabled,
  loginWithTouchId,
  supportsTouchId
} from '../../native/keychain.js'
import type { Dispatch, GetState, Imports } from '../../types/ReduxTypes'
import * as Constants from '../constants'
import s from '../locales/strings.js'
import { translateError } from '../util'
import {
  dispatchAction,
  dispatchActionWitString,
  dispatchActionWithData
} from './'

/**
 * Make it Thunky
 */
export function loginWithRecovery (answers: Array<string>, username: string) {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const backupKey = state.passwordRecovery.recoveryKey
    const username = state.login.username
    const context = imports.context
    const myAccountOptions = {
      ...imports.accountOptions,
      callbacks: {
        ...imports.accountOptions.callbacks,
        onLoggedOut: () => {
          dispatch(dispatchAction(Constants.RESET_APP))
        }
      }
    }
    try {
      const account = await context.loginWithRecovery2(
        backupKey,
        username,
        answers,
        myAccountOptions
      )
      const touchDisabled = await isTouchDisabled(context, account.username)
      if (!touchDisabled) {
        await enableTouchId(context, account)
      }
      await context.io.folder
        .file('lastuser.json')
        .setText(JSON.stringify({ username: account.username }))
        .catch(e => null)
      const isTouchSupported = await supportsTouchId()
      const touchEnabled = await isTouchEnabled(context, account.username)
      const touchIdInformation = {
        isTouchSupported,
        isTouchEnabled: touchEnabled
      }
      const obj = {
        account,
        touchIdInformation
      }
      dispatch(dispatchActionWithData(Constants.LOGIN_RECOVERY_SUCCEESS, obj))
    } catch (e) {
      console.log('there was an error')
      console.log(e.message)
      const incorrect = 'The answers you provided are incorrect. '
      dispatch(
        dispatchActionWitString(Constants.ON_RECOVERY_LOGIN_ERROR, incorrect)
      )
    }
  }
}

export function resetOtpReset () {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const context = imports.context
    const username = state.login.username
    const otpResetToken = state.login.otpResetToken
    try {
      const response = await context.requestOtpReset(username, otpResetToken)
      console.log(response)
      dispatch(dispatchActionWithData(Constants.OTP_RESET_REQUEST, response))
      console.log('Make it to the next scent ')
    } catch (e) {
      console.log(e)
      console.log('stop')
    }
  }
}
export function retryWithOtp () {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    dispatch(dispatchAction(Constants.START_RECOVERY_LOGIN))
    const state = getState()
    const userBackUpKey = state.login.otpUserBackupKey
    const previousAttemptType = state.login.previousAttemptType
    if (previousAttemptType === 'PASSWORD') {
      return userLogin(
        { username: state.login.username, password: state.login.password },
        userBackUpKey
      )(dispatch, getState, imports)
    }
    return userLoginWithPin(
      { username: state.login.username, pin: state.login.pin },
      userBackUpKey
    )(dispatch, getState, imports)
  }
}
export function userLoginWithTouchId (data: Object) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const context = imports.context
    const callback = imports.callback
    const myAccountOptions = {
      ...imports.accountOptions,
      callbacks: {
        ...imports.accountOptions.callbacks,
        onLoggedOut: () => {
          dispatch(dispatchAction(Constants.RESET_APP))
        }
      }
    }
    const startFunction = () => {
      dispatch(dispatchAction(Constants.AUTH_LOGGING_IN_WITH_PIN))
    }
    loginWithTouchId(
      context,
      data.username,
      'Touch to login user: `' + data.username + '`',
      s.strings.login_with_password,
      myAccountOptions,
      startFunction
    )
      .then(async response => {
        if (response) {
          context.io.folder
            .file('lastuser.json')
            .setText(JSON.stringify({ username: data.username }))
            .catch(e => null)
          dispatch(dispatchAction(Constants.LOGIN_SUCCEESS))
          const touchIdInformation = {
            isTouchSupported: true,
            isTouchEnabled: true
          }
          callback(null, response, touchIdInformation)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
export function userLoginWithPin (data: Object, backupKey?: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const context = imports.context
    const callback = imports.callback
    const myAccountOptions = {
      ...imports.accountOptions,
      callbacks: {
        ...imports.accountOptions.callbacks,
        onLoggedOut: () => {
          dispatch(dispatchAction(Constants.RESET_APP))
        }
      }
    }
    if (backupKey) {
      console.log(backupKey)
      myAccountOptions.otp = backupKey
    }
    dispatch(dispatchActionWithData(Constants.AUTH_UPDATE_PIN, data.pin))
    if (data.pin.length === 4) {
      setTimeout(async () => {
        try {
          const abcAccount = await context.loginWithPIN(
            data.username,
            data.pin,
            myAccountOptions
          )
          const touchDisabled = await isTouchDisabled(
            context,
            abcAccount.username
          )
          if (!touchDisabled) {
            await enableTouchId(context, abcAccount)
          }
          await context.io.folder
            .file('lastuser.json')
            .setText(JSON.stringify({ username: abcAccount.username }))
            .catch(e => null)
          const isTouchSupported = await supportsTouchId()
          const touchEnabled = await isTouchEnabled(
            context,
            abcAccount.username
          )
          const touchIdInformation = {
            isTouchSupported,
            isTouchEnabled: touchEnabled
          }
          dispatch(dispatchAction(Constants.LOGIN_SUCCEESS))
          callback(null, abcAccount, touchIdInformation)
        } catch (e) {
          console.log('LOG IN WITH PIN ERROR ')
          console.log(e.message)
          if (e.name === 'OtpError') {
            e.loginAttempt = 'PIN'
            dispatch(dispatchActionWithData(Constants.OTP_ERROR, e))
            return
          }
          dispatch(
            dispatchActionWitString(
              Constants.LOGIN_USERNAME_PASSWORD_FAIL,
              e.name === 'PasswordError'
                ? 'Invalid PIN'
                : e.name === 'UsernameError'
                  ? 'PIN is not enabled for this account'
                  : e.message
            )
          )
          callback(e.message, null)
        }
      }, 300)
    }
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
  }
}

export function userLogin (data: Object, backupKey?: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const context = imports.context
    const callback = imports.callback
    const myAccountOptions = {
      ...imports.accountOptions,
      callbacks: {
        ...imports.accountOptions.callbacks,
        onLoggedOut: () => {
          dispatch(dispatchAction(Constants.RESET_APP))
        }
      }
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
        const touchDisabled = await isTouchDisabled(
          context,
          abcAccount.username
        )
        if (!touchDisabled) {
          await enableTouchId(context, abcAccount)
        }
        await context.io.folder
          .file('lastuser.json')
          .setText(JSON.stringify({ username: abcAccount.username }))
          .catch(e => null)
        const touchEnabled = await isTouchEnabled(context, abcAccount.username)
        const isTouchSupported = await supportsTouchId()
        const touchIdInformation = {
          isTouchSupported,
          isTouchEnabled: touchEnabled
        }
        dispatch(dispatchAction(Constants.LOGIN_SUCCEESS))
        callback(null, abcAccount, touchIdInformation)
      } catch (e) {
        if (e.name === 'OtpError' && !myAccountOptions.otp) {
          e.loginAttempt = 'PASSWORD'
          dispatch(dispatchActionWithData(Constants.OTP_ERROR, e))
          return
        }
        if (e.name === 'OtpError' && myAccountOptions.otp) {
          dispatch(
            dispatchActionWitString(
              Constants.OTP_LOGIN_BACKUPKEY_FAIL,
              'Backup Key was incorrect'
            )
          )
          return
        }
        if (myAccountOptions.otp) {
          dispatch(
            dispatchActionWitString(
              Constants.OTP_LOGIN_BACKUPKEY_FAIL,
              translateError(e.message)
            )
          )
          console.log('stop')
          return
        }
        dispatch(
          dispatch(
            dispatchActionWithData(
              Constants.LOGIN_USERNAME_PASSWORD_FAIL,
              e.message
            )
          )
        )
        callback(e.message, null)
      }
    }, 300)
  }
}

export function getEdgeLoginQrCode () {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const context = imports.context
    const callback = imports.callback
    const myAccountOptions = {
      ...imports.accountOptions,
      callbacks: {
        ...imports.accountOptions.callbacks,
        onLoggedOut: () => {
          dispatch(dispatchAction(Constants.RESET_APP))
        }
      },
      displayImageUrl:
        'https://github.com/Airbitz/edge-brand-guide/blob/master/Logo/Mark/Edge-Final-Logo_Mark-Green.png',
      displayName: 'Edge Wallet',
      onProcessLogin: username => {
        // throw spinner
      },
      onLogin: (e, account) => {
        callback(e, account)
      }
    }
    try {
      const qr = await context.requestEdgeLogin(myAccountOptions)
      console.log(qr)
      dispatch(dispatchActionWithData(Constants.START_EDGE_LOGIN_REQUEST, qr))
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      console.log(e)
    }
  }
}
export function recoveryLoginComplete () {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const account = state.login.account
    const touchIdInformation = state.login.touchIdInformation
    const callback = imports.callback
    dispatch(dispatchAction(Constants.CLOSE_NOTIFICATION_MODAL))
    callback(null, account, touchIdInformation)
  }
}
// validateUsername check
