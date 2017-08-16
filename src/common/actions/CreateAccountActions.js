import * as Constants from '../constants'
import * as WorkflowActions from './WorkflowActions'
import { isASCII } from '../util'
import {dispatchActionWithData} from './'

export function checkUsernameForAvailabilty (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    setTimeout(() => {
      context
        .usernameAvailable(data)
        .then(async response => {
          if (response) {
            const obj = {
              username: data,
              error: null
            }
            dispatch(
              dispatchActionWithData(Constants.AUTH_UPDATE_USERNAME, obj)
            )
            dispatch(WorkflowActions.nextScreen())
            return
          }
          const obj = {
            username: data,
            error: 'THE USERNAME ALREADY EXOSTS ' // TODO - localize string.
          }
          dispatch(dispatchActionWithData(Constants.AUTH_UPDATE_USERNAME, obj))
        })
        .catch(e => {
          console.log('Big ficking error ')
          console.log(e.message)
          console.log(e)
        })
    }, 300)
  }
}

export function validateUsername (data) {
  return (dispatch, getState, imports) => {
    // TODO evaluate client side evaluations.
    let error = data.length > 3
      ? null
      : 'Username must be longer than 3 characters ' // TODO: Localize string
    error = isASCII(data) ? error : 'Username must only be ascii characthers ' // TODO: localize
    const obj = {
      username: data,
      error: error
    }
    dispatch(dispatchActionWithData(Constants.AUTH_UPDATE_USERNAME, obj))
  }
}
export function validateConfirmPassword (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    let error = null
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    const passwordEval = context.checkPasswordRules(data)
    if (!passwordEval.passed) {
      error = 'Insufficient Password' // TODO localize.
    }
    var obj = {
      password: data,
      passwordStatus: passwordEval,
      error: error
    }
    dispatch(
      dispatchActionWithData(Constants.AUTH_UPDATE_CONFIRM_PASSWORD, obj)
    )
  }
}
export function validatePassword (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    let error = null
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    const passwordEval = context.checkPasswordRules(data)
    if (!passwordEval.passed) {
      error = 'Insufficient Password' // TODO localize.
    }
    var obj = {
      password: data,
      passwordStatus: passwordEval,
      error: error
    }
    dispatch(dispatchActionWithData(Constants.AUTH_UPDATE_PASSWORD, obj))
  }
}

export function createUser (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    dispatch(WorkflowActions.nextScreen())
    setTimeout(() => {
      context
        .createAccount(data.username, data.password, data.pin, null, null)
        .then(async response => {
          console.log('response create user ')
          dispatch(dispatchActionWithData(Constants.CREATE_ACCOUNT_SUCCESS, response))
        })
        .catch(e => {
          console.log('Big ficking error createUser')
          console.log(e)
          dispatch(dispatchActionWithData(Constants.CREATE_ACCOUNT_FAIL, e.message))
        })
    }, 300)
  }
}
export function agreeToConditions (account) {
  return (dispatch, getState, imports) => {
    console.log('Skip Password. ')
    // dispatch(WorkflowActions.nextScreen())
  }
}

export function skipPassword (data) {
  return (dispatch, getState, imports) => {
    console.log('Skip Password. ')
    let callback = imports.callback
    callback(data)
    // dispatch(WorkflowActions.nextScreen())
  }
}
