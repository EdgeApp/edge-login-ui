import * as Constants from '../constants'
import { dispatchAction, dispatchActionWithData } from './'
import { enableTouchId, loginWithTouchId, isTouchEnabled, supportsTouchId, isTouchDisabled } from '../../native/keychain.js'

/**
 * Make it Thunky
 */

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
export function userLoginWithPin (data) {
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

export function userLogin (data) {
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
// validateUsername check
