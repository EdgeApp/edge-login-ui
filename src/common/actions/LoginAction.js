import * as Constants from '../constants'
import { dispatchAction, dispatchActionWithData } from './'
import { enableTouchId } from '../../native/keychain.js'

/* export function loginPIN (data) {
  return {
    type: Constants.LOG_IN_PIN,
    data
  }
} */

export function testAction (data) {
  return (dispatch, getState, imports) => {
    dispatch(dispatchActionWithData('JUST A TEST DO NOTHING', data))
  }
}

/**
 * Make it Thunky
 */

export function userLoginWithPin (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    let callback = imports.callback
    let accountOptions = imports.accountOptions
    dispatch(dispatchActionWithData(Constants.AUTH_UPDATE_PIN, data.pin))
    if (data.pin.length === 4) {
      console.log('USER LOGIN WITH PIN ')
      console.log(data)
      setTimeout(() => {
        context
          .loginWithPIN(data.username, data.pin, accountOptions)
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
    let context = imports.context
    let callback = imports.callback
    let accountOptions = imports.accountOptions
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    setTimeout(() => {
      context
        .loginWithPassword(data.username, data.password, accountOptions)
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

