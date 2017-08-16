import * as Constants from '../constants'
import {dispatchAction, dispatchActionWithData} from './'

/* export function loginPIN (data) {
  return {
    type: Constants.LOG_IN_PIN,
    data
  }
} */

export function testAction (data) {
  return (dispatch, getState, imports) => {
    dispatch(dispatchActionWithData(data))
  }
}

/**
 * Make it Thunky
 */

export function userLoginWithPin (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    let callback = imports.callback
    dispatch(dispatchActionWithData(Constants.AUTH_UPDATE_PIN, data))
    if (data.length === 4) {
      setTimeout(() => {
        context
          .loginWithPIN(data.username, data.pin, null, null)
          .then(async response => {
            await context.io.folder
              .file('lastuser.json')
              .setText(JSON.stringify({ username: data.username }))
              .catch(e => null)
            dispatch(dispatchAction(Constants.LOGIN_USERNAME_PASSWORD))
            callback(null, response)
          })
          .catch(e => {
            dispatch(
              dispatchActionWithData(
                Constants.LOGIN_USERNAME_PASSWORD_FAIL,
                e.message
              )
            )
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
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    setTimeout(() => {
      context
        .loginWithPassword(data.username, data.password, null, null)
        .then(async response => {
          await context.io.folder
            .file('lastuser.json')
            .setText(JSON.stringify({ username: data.username }))
            .catch(e => null)
          dispatch(dispatchAction(Constants.LOGIN_USERNAME_PASSWORD))
          callback(null, response)
        })
        .catch(e => {
          dispatch(
            dispatchActionWithData(
              Constants.LOGIN_USERNAME_PASSWORD_FAIL,
              e.message
            )
          )
        })
    }, 300)
  }
}
// validateUsername check

export function pin (data) {
  return (dispatch, getState, imports) => {
    let error = null
    if (data.length !== 4) {
      error = 'PIN MUST BE 4 Digits' // TODO localize
    }
    var obj = {
      password: data,
      error: error
    }
    console.log(obj)
    // dispatch(updatePin(obj))
  }
}

