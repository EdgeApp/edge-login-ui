// @flow

import { type EdgeAccount, type OtpError } from 'edge-core-js'

import { type Action } from '../types/ReduxTypes.js'
import { type LoginAttempt } from '../util/loginAttempt.js'

const flowHack: any = {}
const defaultAccount: EdgeAccount = flowHack

export type LoginState = {
  +account: EdgeAccount,
  +errorMessage: string | null,
  +isLoggingInWithPin: boolean,
  +loginSuccess: boolean,
  +otpAttempt: LoginAttempt | null,
  +otpError: OtpError | null,
  +otpResetDate?: Date,
  +pin: string | null,
  +username: string,
  +wait: number
}

const initialState: LoginState = {
  account: defaultAccount,
  errorMessage: null,
  isLoggingInWithPin: false,
  loginSuccess: false,
  otpAttempt: null,
  otpError: null,
  pin: null,
  username: '',
  wait: 0
}

export function login(
  state: LoginState = initialState,
  action: Action
): LoginState {
  switch (action.type) {
    case 'SET_PREVIOUS_USERS': {
      const { startupUser } = action.data
      if (startupUser != null) {
        return { ...state, username: startupUser.username }
      }
      return state
    }
    case 'AUTH_UPDATE_USERNAME':
      return { ...state, username: action.data, errorMessage: null, wait: 0 }
    case 'UPDATE_WAIT_TIMER':
      return { ...state, wait: action.data.seconds }
    case 'AUTH_UPDATE_PIN':
      return { ...state, pin: action.data, errorMessage: null }
    case 'LOGIN_SUCCEESS':
      return {
        ...state,
        loginSuccess: true,
        isLoggingInWithPin: false,
        errorMessage: null,
        wait: 0
      }
    case 'LOGIN_PIN_FAIL':
      return {
        ...state,
        errorMessage: action.data.message,
        wait: action.data.wait,
        pin: '',
        isLoggingInWithPin: false
      }
    case 'AUTH_LOGGING_IN_WITH_PIN':
      return { ...state, isLoggingInWithPin: true }
    case 'OTP_ERROR':
      return {
        ...state,
        otpAttempt: action.data.attempt,
        otpError: action.data.error,
        otpResetDate: action.data.error.resetDate
      }
    case 'OTP_RESET_REQUEST':
      return {
        ...state,
        otpResetDate: action.data
      }
    case 'RESET_APP': {
      const username = state.username
      return { ...initialState, username: username }
    }

    case 'PASSWORD_RECOVERY_INITIALIZED':
      return {
        ...state,
        account: action.data.account,
        username: action.data.username
      }
    case 'START_RESECURE':
      return { ...state, account: action.data }
    case 'START_SECURITY_ALERT':
      return { ...state, account: action.data }
    default:
      return state
  }
}
