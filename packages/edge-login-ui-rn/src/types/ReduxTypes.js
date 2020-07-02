// @flow

import type { DiskletFolder } from 'disklet'
import type { EdgeAccount, EdgeAccountOptions, EdgeContext } from 'edge-core-js'
import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux'

import type { PreviousUsersState } from '../common/actions/PreviousUsersActions.js'

export type Action = { type: string, data?: any }

export type State = {
  previousUsers: PreviousUsersState,
  workflow: {
    currentKey: string,
    details: Array<Object>,
    currentSceneIndex: number,
    showModal: boolean,
    data: Object
  },
  create: {
    username: string,
    password: string,
    pin: string,
    pinError: string,
    pinErrorMessage: string,
    createErrorMessage: string | null,
    confirmPassword: string,
    confirmPasswordErrorMessage: string,
    usernameErrorMessage: string,
    showModal: boolean,
    passwordStatus: Object,
    accountObject: EdgeAccount
  },
  login: {
    account: EdgeAccount,
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
    previousAttemptData: any,
    touchIdInformation: Object,
    recoveryToken: string,
    wait: number,
    otpErrorMessage: string | null
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

export type Store = ReduxStore<State, Action>
export type GetState = () => State
export type Imports = {
  onCancel: Function,
  accountOptions: EdgeAccountOptions,
  accountObject?: EdgeAccount,
  context: EdgeContext,
  folder: DiskletFolder,
  onComplete: Function,
  callback: Function,
  username?: string | null,
  recoveryKey?: string
}

// eslint-disable-next-line no-use-before-define
export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>
type ThunkDispatch<A> = (
  (d: Dispatch, g: GetState, i: Imports) => Promise<void> | void
) => A
