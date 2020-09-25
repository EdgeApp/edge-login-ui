// @flow

import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'
import { getPreviousUsers } from './PreviousUsersActions.js'

export const deleteUserFromDevice = (username: string) => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  const { context } = imports
  await context.deleteLocalAccount(username)
  await dispatch(getPreviousUsers())
}
