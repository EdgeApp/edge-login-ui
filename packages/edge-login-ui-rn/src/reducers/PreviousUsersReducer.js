// @flow

import { type Action } from '../types/ReduxTypes.js'

export type LoginUserInfo = {
  username: string,
  pinEnabled: boolean,
  touchEnabled: boolean
}

export type PreviousUsersState = {
  +loaded: boolean,
  +startupUser?: LoginUserInfo,
  +userList: LoginUserInfo[],
  +usernameOnlyList: string[]
}

const initialState: PreviousUsersState = {
  userList: [],
  usernameOnlyList: [],
  loaded: false
}

export function previousUsers(
  state: PreviousUsersState = initialState,
  action: Action
): PreviousUsersState {
  return action.type === 'SET_PREVIOUS_USERS' ? action.data : state
}
