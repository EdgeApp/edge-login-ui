// @flow

import { type Reducer } from 'redux'

import { type Action } from '../types/ReduxTypes.js'

export type LoginUserInfo = {
  username: string,
  pinEnabled: boolean,
  touchEnabled: boolean
}

export type PreviousUsersState = {
  +lastUser?: LoginUserInfo,
  +loaded: boolean,
  +userList: LoginUserInfo[],
  +usernameOnlyList: string[]
}

const initialState: PreviousUsersState = {
  userList: [],
  usernameOnlyList: [],
  loaded: false
}

export const previousUsers: Reducer<PreviousUsersState, Action> = function(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'SET_PREVIOUS_USERS':
      return { ...action.data, loaded: true }

    default:
      return state
  }
}
