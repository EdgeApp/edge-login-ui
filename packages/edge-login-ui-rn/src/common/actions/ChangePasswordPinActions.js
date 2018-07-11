// @flow

import type { Dispatch, GetState, Imports } from '../../types/ReduxTypes'
import * as Constants from '../constants'
import { dispatchAction } from './'

export function changePassword (data: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const accountObject = imports.accountObject
    if (!accountObject) {
      return
    }
    accountObject
      .changePassword(data)
      .then(response => {
        dispatch(dispatchAction(Constants.LAUNCH_NOTIFICATION_MODAL))
      })
      .catch(e => {
        console.log('CHANGE PASSWORD ERROR')
        console.log(e)
      })
  }
}
export function recoveryChangePassword (data: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const account = state.login.account
    account
      .changePassword(data)
      .then(response => {
        dispatch(dispatchAction(Constants.WORKFLOW_NEXT))
      })
      .catch(e => {
        console.log('CHANGE PASSWORD ERROR')
        console.log(e)
      })
  }
}

export function recoveryChangePIN (data: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const account = state.login.account
    if (!account) {
      return
    }
    account
      .changePin({ pin: data })
      .then(response => {
        dispatch(dispatchAction(Constants.LAUNCH_NOTIFICATION_MODAL))
      })
      .catch(e => {
        console.log('CHANGE PIN ERROR')
        console.log(e)
      })
  }
}

export function changePIN (data: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const accountObject = imports.accountObject
    if (!accountObject) {
      return
    }
    accountObject
      .changePin({ pin: data })
      .then(response => {
        dispatch(dispatchAction(Constants.LAUNCH_NOTIFICATION_MODAL))
      })
      .catch(e => {
        console.log('CHANGE PIN ERROR')
        console.log(e)
      })
  }
}
