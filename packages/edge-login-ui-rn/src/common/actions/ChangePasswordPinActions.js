// @flow
import * as Constants from '../constants'
import { dispatchAction } from './'
import type { Dispatch, GetState, Imports } from '../../types/ReduxTypes'

export function changePassword (data: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const accountObject = imports.accountObject
    accountObject
      .changePassword(data)
      .then(response => {
        dispatch(dispatchAction(Constants.LAUNCH_NOTIFICATION_MODAL))
      })
      .catch(e => {
        console.log('CHANGE PASSWOD ERROR')
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
        console.log('CHANGE PASSWOD ERROR')
        console.log(e)
      })
  }
}

export function recoveryChangePIN (data: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const account = state.login.account
    account
      .changePIN(data)
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
    accountObject
      .changePIN(data)
      .then(response => {
        dispatch(dispatchAction(Constants.LAUNCH_NOTIFICATION_MODAL))
      })
      .catch(e => {
        console.log('CHANGE PIN ERROR')
        console.log(e)
      })
  }
}
