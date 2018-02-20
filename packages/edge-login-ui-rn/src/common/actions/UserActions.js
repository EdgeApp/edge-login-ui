import * as Constants from '../constants'
import { dispatchActionWithData, getPreviousUsers } from './'

export function deleteUserFromDevice (data) {
  return (dispatch, getState, imports) => {
    const context = imports.context
    setTimeout(() => {
      context
        .deleteLocalAccount(data)
        .then(async response => {
          dispatch(getPreviousUsers())
        })
        .catch(e => {
          console.log('error createUser')
          console.log(e)
          dispatch(
            dispatchActionWithData(Constants.WORKFLOW_CANCEL_MODAL, e.message)
          )
        })
    }, 300)
  }
}
