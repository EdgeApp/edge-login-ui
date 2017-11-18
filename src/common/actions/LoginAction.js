import * as Constants from '../constants'
import { dispatchAction, dispatchActionWithData } from './'
import { enableTouchId, loginWithTouchId } from '../../native/keychain.js'

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
        callback(null, response)
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
      setTimeout(() => {
        context
          .loginWithPIN(data.username, data.pin, myAccountOptions)
          .then(async response => {
            enableTouchId(response)
            await context.io.folder
              .file('lastuser.json')
              .setText(JSON.stringify({ username: data.username }))
              .catch(e => null)
            dispatch(dispatchAction(Constants.LOGIN_SUCCEESS))
            return response
          })
          .catch(e => {
            console.log('LOG IN WITH PIN ERROR ')
            console.log(e.message)
            dispatch(
              dispatchActionWithData(
                Constants.LOGIN_USERNAME_PASSWORD_FAIL,
                e.message
              )
            )
            callback(e.message, null)
          })
          .then((response) => {
            callback(null, response)
          })
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
    setTimeout(() => {
      context
        .loginWithPassword(data.username, data.password, myAccountOptions)
        .then(async response => {
          await context.io.folder
            .file('lastuser.json')
            .setText(JSON.stringify({ username: data.username }))
            .catch(e => null)
          dispatch(dispatchAction(Constants.LOGIN_SUCCEESS))
          return response
        })
        .catch(e => {
          dispatch(
            dispatchActionWithData(
              Constants.LOGIN_USERNAME_PASSWORD_FAIL,
              e.message
            )
          )
          callback(e.message, null)
        })
        .then((response) => {
          callback(null, response)
        })
    }, 300)
  }
}
// validateUsername check

