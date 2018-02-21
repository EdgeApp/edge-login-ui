// @flow

/* import type {
  AbcAccount,
  AbcContext,
  AbcCurrencyPlugin,
  AbcCurrencyWallet,
  AbcDenomination,
  AbcLobby,
  AbcParsedUri,
  AbcReceiveAddress,
  AbcTransaction,
  EdgeReceiveAddress
} from 'edge-login' */
import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux'

export type Action = { type: string, data?: any }

export type State = {
  previousUsers: {
    lastUser: Object,
    usersWithPinList: Array<string>,
    usernameOnlyList: Array<string>,
    filteredUsernameList: Array<string>,
    userList: Array<Object>
  },
  workflow: {
    currentKey: string
  }
}

type ThunkDispatch<A> = ((Dispatch, GetState) => Promise<void> | void) => A

export type Store = ReduxStore<State, Action>
export type GetState = () => State
export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>
