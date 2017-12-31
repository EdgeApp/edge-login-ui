import * as Constants from '../constants'
import { dispatchAction, dispatchActionWithData } from './'
import { enableTouchId, loginWithTouchId, isTouchEnabled, supportsTouchId, isTouchDisabled } from '../../native/keychain.js'

/**
 * Make it Thunky
 */

export function resetOtpReset () {
  return async (dispatch, getState, imports) => {
    const state = getState()
    const context = imports.context
    const username = state.login.username
    const otpResetToken = state.login.otpResetToken
    try {
      const response = await context.requestOtpReset(username, otpResetToken)
      console.log(response)
      console.log('Make it to the next scent ')
    } catch (e) {
      console.log(e)
      console.log('stop')
    }
  }
}
export function retryWithOtp () {
  return (dispatch, getState, imports) => {
    const state = getState()
    const userBackUpKey = state.login.otpUserBackupKey
    const previousAttemptType = state.login.previousAttemptType
    if (previousAttemptType === 'PASSWORD') {
      return userLogin({username: state.login.username, password: state.login.password}, userBackUpKey)(dispatch, getState, imports)
    }
    return userLoginWithPin({username: state.login.username, pin: state.login.pin}, userBackUpKey)(dispatch, getState, imports)
  }
}
export function userLoginWithTouchId (data) {
  return (dispatch, getState, imports) => {
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
      null,
      myAccountOptions,
      startFunction
    ).then(async response => {
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
    }).catch(e => {
      console.log(e)
    })
  }
}
export function userLoginWithPin (data, backupKey = null) {
  return (dispatch, getState, imports) => {
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
    console.log(myAccountOptions)
    dispatch(dispatchActionWithData(Constants.AUTH_UPDATE_PIN, data.pin))
    if (data.pin.length === 4) {
      setTimeout(async () => {
        try {
          const abcAccount = await context.loginWithPIN(data.username, data.pin, myAccountOptions)
          const touchDisabled = await isTouchDisabled(context, abcAccount.username)
          if (!touchDisabled) {
            await enableTouchId(context, abcAccount)
          }
          await context.io.folder
              .file('lastuser.json')
              .setText(JSON.stringify({ username: abcAccount.username }))
              .catch(e => null)
          const isTouchSupported = await supportsTouchId()
          const touchEnabled = await isTouchEnabled(context, abcAccount.username)
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
            dispatchActionWithData(
              Constants.LOGIN_USERNAME_PASSWORD_FAIL,
              e.name === 'PasswordError' ? 'Invalid PIN' : e.name === 'UsernameError' ? 'PIN is not enabled for this account' : e.message
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

export function userLogin (data, backupKey = null) {
  return (dispatch, getState, imports) => {
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
    setTimeout(async() => {
      try {
        const abcAccount = await context.loginWithPassword(data.username, data.password, myAccountOptions)
        const touchDisabled = await isTouchDisabled(context, abcAccount.username)
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
        if (e.name === 'OtpError') {
          e.loginAttempt = 'PASSWORD'
          dispatch(dispatchActionWithData(Constants.OTP_ERROR, e))
          return
        }
        dispatch(
          dispatchActionWithData(
            Constants.LOGIN_USERNAME_PASSWORD_FAIL,
            e.message
          )
        )
        callback(e.message, null)
      }
    }, 300)
  }
}

export function getEdgeLoginQrCode () {
  return (dispatch, getState, imports) => async () => {
    // const context = imports.context
    // context.
  }
}

// validateUsername check
