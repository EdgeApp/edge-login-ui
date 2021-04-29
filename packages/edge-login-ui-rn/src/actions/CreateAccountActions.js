// @flow

import { sprintf } from 'sprintf-js'
import passwordCheck from 'zxcvbn'

import s from '../common/locales/strings.js'
import * as Constants from '../constants/index.js'
import { enableTouchId, isTouchDisabled } from '../keychain.js'
import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'
import { isASCII } from '../util/ASCIIUtil.js'
import { getPreviousUsers, setMostRecentUsers } from './PreviousUsersActions.js'

export function validatePin(data: Object) {
  const pin = data.pin
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    let error = null
    if (pin.length !== 4) {
      error = s.strings.four_digit_pin_error
    }
    if (pin.length > 4) {
      return
    }
    const obj = {
      pin: pin,
      error: error
    }
    dispatch({ type: 'CREATE_UPDATE_PIN', data: obj })
    // dispatch(updatePin(obj))
  }
}
export function checkUsernameForAvailabilty(data: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const context = imports.context
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
            global.firebase &&
              global.firebase.analytics().logEvent(`Signup_Username_Available`)
            dispatch({ type: 'CREATE_UPDATE_USERNAME', data: obj })
            dispatch({ type: 'WORKFLOW_NEXT' })
            return
          }
          const obj = {
            username: data,
            error: s.strings.username_exists_error
          }
          global.firebase &&
            global.firebase.analytics().logEvent(`Signup_Username_Unavailable`)
          dispatch({ type: 'CREATE_UPDATE_USERNAME', data: obj })
        })
        .catch(e => {
          console.log(e.message)
        })
    }, 300)
  }
}

export function validateUsername(data: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    // TODO evaluate client side evaluations.
    let error = data.length > 2 ? null : s.strings.username_3_characters_error // TODO: Localize string
    error = isASCII(data) ? error : s.strings.username_ascii_error // TODO: localize
    const obj = {
      username: data,
      error: error
    }
    dispatch({ type: 'CREATE_UPDATE_USERNAME', data: obj })
  }
}
export function validateConfirmPassword(confirmPassword: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    let error = null
    if (confirmPassword !== state.create.password) {
      error = s.strings.confirm_password_error
    }
    dispatch({
      type: 'AUTH_UPDATE_CONFIRM_PASSWORD',
      data: { password: confirmPassword, error }
    })
  }
}
export function validatePassword(data: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const context = imports.context
    let error = null
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    const passwordEval = context.checkPasswordRules(data)
    const passwordCheckResult = passwordCheck(data)
    let passwordCheckString

    if (
      passwordCheckResult &&
      passwordCheckResult.crack_times_display &&
      passwordCheckResult.crack_times_display.online_no_throttling_10_per_second
    ) {
      passwordCheckString =
        passwordCheckResult.crack_times_display
          .online_no_throttling_10_per_second
    }

    passwordCheckString = sprintf(
      s.strings.it_would_take_xx_to_crack,
      passwordCheckString
    )
    if (passwordCheckResult.score < 3) {
      passwordCheckString += s.strings.recommend_choosing_a_stronger
    }

    if (!passwordEval.passed) {
      error = s.strings.password_error // TODO localize.
    }

    dispatch({
      type: 'AUTH_UPDATE_PASSWORD',
      data: {
        password: data,
        passwordStatus: passwordEval,
        passwordCheckString,
        error: error
      }
    })
  }
}

export function createUser(data: Object) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { context } = imports
    dispatch({ type: 'WORKFLOW_NEXT' })
    setTimeout(async () => {
      try {
        const abcAccount = await context.createAccount(
          data.username,
          data.password,
          data.pin,
          imports.accountOptions
        )
        abcAccount.watch('loggedIn', loggedIn => {
          if (!loggedIn) dispatch({ type: 'RESET_APP' })
        })
        const touchDisabled = await isTouchDisabled(abcAccount.username)
        if (!touchDisabled) {
          await enableTouchId(abcAccount).catch(e => {
            console.log(e) // Fail quietly
          })
        }
        dispatch({ type: 'CREATE_ACCOUNT_SUCCESS', data: abcAccount })
        dispatch({ type: 'WORKFLOW_NEXT' })
        global.firebase &&
          global.firebase.analytics().logEvent('Signup_Create_User_Success')
        await setMostRecentUsers(abcAccount.username)
        await abcAccount.dataStore.setItem(
          Constants.OTP_REMINDER_STORE_NAME,
          Constants.OTP_REMINDER_KEY_NAME_CREATED_AT,
          Date.now().toString()
        )
        dispatch(getPreviousUsers())
      } catch (e) {
        console.log(e)
        dispatch({ type: 'CREATE_ACCOUNT_FAIL', data: e.message })
        dispatch({ type: 'WORKFLOW_BACK' })
      }
    }, 300)
  }
}

export const agreeToConditions = () => (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  const { account } = getState()
  const { onLogin } = imports
  if (account == null) return

  if (onLogin != null) onLogin(account)
}
