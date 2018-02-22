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
    currentKey: string,
    details: Array<Object>,
    currentSceneIndex: number
  },
  create: {
    username: string,
    password: string,
    pin: string,
    pinErrorMessage: string,
    confirmPassword: string,
    confirmPasswordErrorMessage: string,
    usernameErrorMessage: string,
    showModal: boolean,
    passwordStatus: Object
  },
  login: {
    username: string,
    pin: string,
    password: string,
    errorMessage: string,
    isLoggingInWithPin: boolean,
    edgeLoginId: string,
    cancelEdgeLoginRequest(): void
  },
  passwordStatus: {
    secondsToCrack: number,
    passed: boolean,
    list: Array<Object>
  },
  passwordRecovery: {
    recoveryErrorMessage: string
  }
}

type ThunkDispatch<A> = ((Dispatch, GetState) => Promise<void> | void) => A

export type Store = ReduxStore<State, Action>
export type GetState = () => State
export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>
