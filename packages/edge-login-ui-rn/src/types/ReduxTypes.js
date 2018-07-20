// @flow

import type {
  AbcAccount,
  AbcAccountOptions,
  AbcContext,
  DiskletFolder
} from 'edge-core-js'
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
    currentSceneIndex: number,
    showModal: boolean
  },
  create: {
    username: string,
    password: string,
    pin: string,
    pinError: string,
    pinErrorMessage: string,
    confirmPassword: string,
    confirmPasswordErrorMessage: string,
    usernameErrorMessage: string,
    showModal: boolean,
    passwordStatus: Object,
    accountObject: AbcAccount
  },
  login: {
    account: AbcAccount,
    username: string,
    pin: string,
    password: string,
    errorMessage: string,
    isLoggingInWithPin: boolean,
    loginSuccess: boolean,
    edgeLoginId: string,
    cancelEdgeLoginRequest(): void,
    otpResetToken: string,
    otpUserBackupKey: string,
    previousAttemptType: string,
    touchIdInformation: Object,
    recoveryToken: string
  },
  passwordStatus: {
    secondsToCrack: number,
    passed: boolean,
    list: Array<Object>
  },
  passwordRecovery: {
    recoveryErrorMessage: string,
    userQuestions: Array<string>,
    questionsList: Array<string>,
    recoveryKey: string,
    showRecoveryEmailDialog: boolean
  },
  terms: {}
}

type ThunkDispatch<A> = (
  (Dispatch, GetState, Imports) => Promise<void> | void
) => A

export type Store = ReduxStore<State, Action>
export type GetState = () => State
export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>
export type Imports = {
  onCancel: Function,
  accountOptions: AbcAccountOptions,
  accountObject?: AbcAccount,
  context: AbcContext,
  folder: DiskletFolder,
  onComplete: Function,
  callback: Function,
  username?: string | null,
  recoveryKey?: string
}
