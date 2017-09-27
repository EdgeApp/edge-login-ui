import * as Constants from '../constants'
import { dispatchAction } from './'

export function changePassword (data) {
  return (dispatch, getState, imports) => {
    let accountObject = imports.accountObject
    accountObject
      .changePassword(data)
      .then(response => {
        dispatch(dispatchAction(Constants.WORKFLOW_LAUNCH_MODAL))
      })
      .catch(e => {
        console.log('CHANGE PASSWOD ERROR')
        console.log(e)
      })
  }
}

export function changePIN (data) {
  return (dispatch, getState, imports) => {
    let accountObject = imports.accountObject
    accountObject
      .changePIN(data)
      .then(response => {
        dispatch(dispatchAction(Constants.WORKFLOW_LAUNCH_MODAL))
      })
      .catch(e => {
        console.log('CHANGE PIN ERROR')
        console.log(e)
      })
  }
}
