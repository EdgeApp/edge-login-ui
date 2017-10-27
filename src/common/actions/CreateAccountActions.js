import * as Constants from '../constants'
import * as WorkflowActions from './WorkflowActions'
import { isASCII } from '../util'
import { dispatchAction, dispatchActionWithData } from './'

export function validatePin (data) {
  const pin = data.pin
  return (dispatch, getState, imports) => {
    let error = null
    if (pin.length !== 4) {
      error = 'PIN MUST BE 4 Digits' // TODO localize
    }
    if (pin.length > 4) {
      return
    }
    var obj = {
      pin: pin,
      error: error
    }
    dispatch(dispatchActionWithData(Constants.CREATE_UPDATE_PIN, obj))
    // dispatch(updatePin(obj))
  }
}
export function checkUsernameForAvailabilty (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    console.log('usernmae availblecheck')
    setTimeout(() => {
      context
        .usernameAvailable(data)
        .then(async response => {
          console.log('usernmae availblecheck response')
          console.log(response)
          if (response) {
            const obj = {
              username: data,
              error: null
            }
            dispatch(
              dispatchActionWithData(Constants.CREATE_UPDATE_USERNAME, obj)
            )
            dispatch(dispatchAction(Constants.WORKFLOW_NEXT))
            return
          }
          const obj = {
            username: data,
            error: 'THE USERNAME ALREADY EXISTS ' // TODO - localize string.
          }
          dispatch(
            dispatchActionWithData(Constants.CREATE_UPDATE_USERNAME, obj)
          )
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
      : Constants.USERNAME_3_CHARACTERS_ERROR // TODO: Localize string
    error = isASCII(data) ? error : Constants.USERNAME_ASCII_ERROR // TODO: localize
    const obj = {
      username: data,
      error: error
    }
    dispatch(dispatchActionWithData(Constants.CREATE_UPDATE_USERNAME, obj))
  }
}
export function validateConfirmPassword (data) {
  return (dispatch, getState, imports) => {
    const state = getState()
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    let error = null
    if (data !== state.create.password) {
      error = Constants.CONFIRM_PASSWORD_ERROR
    }
    var obj = {
      password: data,
      error
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
      error = Constants.PASSWORD_ERROR // TODO localize.
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
    let accountOptions = imports.accountOptions
    dispatch(WorkflowActions.nextScreen())
    setTimeout(() => {
      context
        .createAccount(data.username, data.password, data.pin, accountOptions)
        .then(async response => {
          console.log('response create user ')
          dispatch(
            dispatchActionWithData(Constants.CREATE_ACCOUNT_SUCCESS, response)
          )
          dispatch(dispatchAction(Constants.WORKFLOW_NEXT))
        })
        .catch(e => {
          console.log('Big ficking error createUser')
          console.log(e)
          dispatch(
            dispatchActionWithData(Constants.CREATE_ACCOUNT_FAIL, e.message)
          )
        })
    }, 300)
  }
}
export function agreeToConditions (account) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    let callback = imports.callback
    // write to disklet
    async response => {
      await context.io.folder
        .file('acceptTermsAndConditions.json')
        .setText(JSON.stringify({ accepted: true }))
        .catch(e => {
          console.log('error')
          console.log(e)
        })
      return response
    }
    callback(null, account)
    // dispatch(WorkflowActions.nextScreen())
  }
}

export function skipPassword (data) {
  return (dispatch, getState, imports) => {
    console.log('Skip Password. ')
    // let callback = imports.callback
    // callback(data)
    // dispatch(WorkflowActions.nextScreen())
  }
}
