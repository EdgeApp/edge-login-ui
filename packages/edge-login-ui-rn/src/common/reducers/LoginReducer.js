// @flow

import type { EdgeAccount } from 'edge-core-js'
import { type Reducer } from 'redux'

import { type Action } from '../../types/ReduxTypes'
import { type PreviousUsersState } from '../reducers/PreviousUsersReducer.js'

const flowHack: any = {}
const defaultAccount: EdgeAccount = flowHack

export type LoginState = {
  +account: EdgeAccount,
  +cancelEdgeLoginRequest: (() => void) | null,
  +edgeLoginId: string | null,
  +errorMessage: string | null,
  +isLoggingInWithPin: boolean,
  +loginSuccess: boolean,
  +otpErrorMessage: string | null,
  +otpResetDate: Date | null,
  +otpResetToken: string,
  +otpUserBackupKey: string,
  +password: string | null,
  +pin: string | null,
  +previousAttemptData: any,
  +previousAttemptType: string | null,
  +recoveryToken: string | null,
  +showRecoverSuccessDialog: boolean,
  +touchIdInformation: Object | null,
  +username: string,
  +wait: number
}

const initialState: LoginState = {
  username: '',
  password: null,
  pin: null,
  loginSuccess: false,
  errorMessage: null,
  otpErrorMessage: null,
  isLoggingInWithPin: false,
  otpResetToken: '',
  otpResetDate: null,
  otpUserBackupKey: '', // S7UQ66VYNZKAX4EV
  recoveryToken: null,
  previousAttemptType: null,
  previousAttemptData: null,
  edgeLoginId: null,
  cancelEdgeLoginRequest: null,
  account: defaultAccount,
  touchIdInformation: null,
  showRecoverSuccessDialog: false,
  wait: 0
}

export const login: Reducer<LoginState, Action> = function(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'CANCEL_RECOVERY_KEY':
      return { ...state, recoveryToken: null }
    case 'START_RECOVERY_LOGIN':
      return { ...state, otpErrorMessage: null }
    case 'SET_PREVIOUS_USERS': {
      const data: PreviousUsersState = action.data
      if (data.lastUser) {
        return { ...state, username: data.lastUser.username }
      }
      if (data.userList.length > 0) {
        const topUser = data.userList[0]
        return { ...state, username: topUser.username }
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
        loginPasswordErrorMessage: null,
        isLoggingInWithPin: false,
        errorMessage: null,
        otpErrorMessage: null,
        wait: 0
      }
    case 'LOGIN_USERNAME_PASSWORD_FAIL':
      return {
        ...state,
        errorMessage: action.data,
        pin: '',
        isLoggingInWithPin: false
      }
    case 'LOGIN_PIN_FAIL':
      return {
        ...state,
        errorMessage: action.data.message,
        wait: action.data.wait,
        pin: '',
        isLoggingInWithPin: false
      }
    case 'OTP_LOGIN_BACKUPKEY_FAIL':
      return {
        ...state,
        otpErrorMessage: action.data,
        errorMessage: null
      }
    case 'AUTH_LOGGING_IN_WITH_PIN':
      return { ...state, isLoggingInWithPin: true }
    case 'AUTH_UPDATE_OTP_BACKUP_KEY':
      return { ...state, otpUserBackupKey: action.data }
    case 'AUTH_UPDATE_LOGIN_PASSWORD':
      return { ...state, password: action.data, errorMessage: null }
    case 'OTP_ERROR':
      return {
        ...state,
        otpResetToken: action.data.resetToken,
        otpResetDate: action.data.resetDate,
        previousAttemptType: action.data.loginAttempt,
        previousAttemptData: action.data.loginAttemptData
      }
    case 'OTP_RESET_REQUEST':
      return {
        ...state,
        otpResetDate: action.data
      }
    case 'START_EDGE_LOGIN_REQUEST':
      return {
        ...state,
        edgeLoginId: 'airbitz://edge/' + action.data.id,
        cancelEdgeLoginRequest: action.data.cancelRequest
      }
    case 'CANCEL_EDGE_LOGIN_REQUEST':
      return {
        ...state,
        edgeLoginId: null,
        cancelEdgeLoginRequest: null
      }
    case 'SET_RECOVERY_KEY':
      return { ...state, recoveryToken: action.data }
    case 'RESET_APP': {
      const username = state.username
      return { ...initialState, username: username }
    }

    case 'LOGIN_RECOVERY_SUCCEESS':
      return {
        ...state,
        account: action.data.account,
        touchIdInformation: action.data.touchIdInformation,
        showRecoverSuccessDialog: true
      }
    case 'ON_RECOVERY_LOGIN_ERROR':
      return { ...state, errorMessage: action.data }
    case 'PASSWORD_RECOVERY_INITIALIZED':
      return {
        ...state,
        account: action.data.account,
        username: action.data.username
      }
    default:
      return state
  }
}
