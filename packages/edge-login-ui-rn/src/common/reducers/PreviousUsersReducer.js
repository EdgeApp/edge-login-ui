// @flow

import { type Reducer } from 'redux'

import { type Action } from '../../types/ReduxTypes'

export type LoginUserInfo = {
  username: string,
  pinEnabled: boolean,
  touchEnabled: boolean
}

export type PreviousUsersState = {
  +lastUser?: LoginUserInfo,
  +userList: LoginUserInfo[],
  +usernameOnlyList: string[]
}

const initialState: PreviousUsersState = {
  userList: [],
  usernameOnlyList: []
}

export const previousUsers: Reducer<PreviousUsersState, Action> = function(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'SET_PREVIOUS_USERS':
      return action.data

    default:
      return state
  }
}
