import * as Constants from '../constants'
import * as WorkflowActions from './WorkflowActions'
import { isASCII } from '../util'
import { dispatchAction, dispatchActionWithData, getPreviousUsers } from './'
import passwordCheck from 'zxcvbn'
import { sprintf } from 'sprintf-js'

export function validatePin (data) {
  const pin = data.pin
  return (dispatch, getState, imports) => {
    let error = null
    if (pin.length !== 4) {
      error = Constants.FOUR_DIGIT_PIN_ERROR
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
              dispatchActionWithData(Constants.CREATE_UPDATE_USERNAME, obj)
            )
            dispatch(dispatchAction(Constants.WORKFLOW_NEXT))
            return
          }
          const obj = {
            username: data,
            error: Constants.USERNAME_EXISTS_ERROR
          }
          dispatch(
            dispatchActionWithData(Constants.CREATE_UPDATE_USERNAME, obj)
          )
        })
        .catch(e => {
          console.log(e.message)
        })
    }, 300)
  }
}

export function validateUsername (data) {
  return (dispatch, getState, imports) => {
    // TODO evaluate client side evaluations.
    let error = data.length > 2
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
export function validateConfirmPassword (data = null) {
  return (dispatch, getState, imports) => {
    const state = getState()
    const confirmPassword = data !== null ? data : state.create.confirmPassword
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    let error = null
    if (confirmPassword !== state.create.password) {
      error = Constants.CONFIRM_PASSWORD_ERROR
    }
    var obj = {
      password: confirmPassword,
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
    const passwordCheckResult = passwordCheck(data)
    let passwordCheckString

    if (
      passwordCheckResult &&
      passwordCheckResult.crack_times_display &&
      passwordCheckResult.crack_times_display.online_no_throttling_10_per_second) {
      passwordCheckString = passwordCheckResult.crack_times_display.online_no_throttling_10_per_second
    }

    passwordCheckString = sprintf(Constants.IT_WOULD_TAKE_XX_TO_CRACK, passwordCheckString)
    if (passwordCheckResult.score < 3) {
      passwordCheckString += Constants.RECOMMEND_CHOOSING_A_STRONGER
    }

    if (!passwordEval.passed) {
      error = Constants.PASSWORD_ERROR // TODO localize.
    }

    const obj = {
      password: data,
      passwordStatus: passwordEval,
      passwordCheckString,
      error: error
    }
    dispatch(dispatchActionWithData(Constants.AUTH_UPDATE_PASSWORD, obj))
  }
}

export function createUser (data) {
  return (dispatch, getState, imports) => {
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
    dispatch(WorkflowActions.nextScreen())
    setTimeout(() => {
      context
        .createAccount(data.username, data.password, data.pin, myAccountOptions)
        .then(async response => {
          dispatch(
            dispatchActionWithData(Constants.CREATE_ACCOUNT_SUCCESS, response)
          )
          dispatch(dispatchAction(Constants.WORKFLOW_NEXT))
          await context.io.folder
            .file('lastuser.json')
            .setText(JSON.stringify({ username: data.username }))
            .catch(e => null)
          dispatch(getPreviousUsers(context))
        })
        .catch(e => {
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

