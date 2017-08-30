// import * as Constants from '../constants'
// import { dispatchAction, dispatchActionWithData } from './'

export function deleteUserFromDevice (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    setTimeout(() => {
      context
      .deleteLocalAccount(data, null, null)
      .then(async response => {
        console.log('response deleteLocalAccount')
        /* dispatch(
          dispatchActionWithData(Constants.CREATE_ACCOUNT_SUCCESS, response)
        )
        dispatch(dispatchAction(Constants.WORKFLOW_NEXT)) */
      })
      .catch(e => {
        console.log('Big ficking error createUser')
        console.log(e)
        /* (dispatch(
          dispatchActionWithData(Constants.CREATE_ACCOUNT_FAIL, e.message)
        ) */
      })
    }, 300)
  }
}
