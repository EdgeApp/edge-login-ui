import * as Constants from '../constants'
import { dispatchActionWithData, getPreviousUsers } from './'

export function deleteUserFromDevice (data) {
  console.log('DELETING FROM DEVICE ')
  return (dispatch, getState, imports) => {
    let context = imports.context
    setTimeout(() => {
      context
        .deleteLocalAccount(data)
        .then(async response => {
          console.log('#######response deleteLocalAccount')
          dispatch(getPreviousUsers())
        })
        .catch(e => {
          console.log('########Big ficking error createUser')
          console.log(e)
          dispatch(
            dispatchActionWithData(Constants.WORKFLOW_CANCEL_MODAL, e.message)
          )
        })
    }, 300)
  }
}
