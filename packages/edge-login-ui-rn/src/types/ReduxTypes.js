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
  },
  create: {
    username: string,
    password: string,
    pin: string,
    pinErrorMessage: string
  },
  login: {
    username: string,
    pin: string,
    password: string,
    errorMessage: string,
    isLoggingInWithPin: boolean
  },
  passwordStatus: {
    secondsToCrack: number,
    passed: boolean,
    list: Array<Object>
  }
}

type ThunkDispatch<A> = ((Dispatch, GetState) => Promise<void> | void) => A

export type Store = ReduxStore<State, Action>
export type GetState = () => State
export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>
