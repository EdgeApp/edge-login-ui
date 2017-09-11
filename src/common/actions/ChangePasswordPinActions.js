import * as Constants from '../constants'
import { dispatchAction } from './'

export function changePassword (data) {
  console.log('TRYING TO CHANGE PASSWORD ')
  return (dispatch, getState, imports) => {
    let accountObject = imports.accountObject
    accountObject
      .changePassword(data)
      .then(response => {
        console.log('Response ')
        console.log(response)
        dispatch(dispatchAction(Constants.WORKFLOW_LAUNCH_MODAL))
      })
      .catch(e => {
        console.log('CHANGE PASSWOD ERrOR')
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
        console.log('Response CHANGE PIN ')
        console.log(response)
        dispatch(dispatchAction(Constants.WORKFLOW_LAUNCH_MODAL))
      })
      .catch(e => {
        console.log('CHANGE PIN ERrOR')
        console.log(e)
      })
  }
}
