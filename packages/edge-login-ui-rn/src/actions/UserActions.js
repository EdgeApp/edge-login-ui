// @flow

import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'
import { getPreviousUsers } from './PreviousUsersActions.js'

export function deleteUserFromDevice(data: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
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
          dispatch({ type: 'WORKFLOW_CANCEL_MODAL', data: e.message })
        })
    }, 300)
  }
}
