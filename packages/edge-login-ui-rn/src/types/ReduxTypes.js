// @flow

import type { DiskletFolder } from 'disklet'
import type { EdgeAccount, EdgeAccountOptions, EdgeContext } from 'edge-core-js'

import type { PreviousUsersState } from '../common/actions/PreviousUsersActions.js'
import { type Action } from './ReduxActions.js'

export type { Action }

export type State = {
  previousUsers: PreviousUsersState,
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
    wait: number
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

export type Imports = {
  +accountObject?: EdgeAccount,
  +accountOptions: EdgeAccountOptions,
  +callback: Function,
  +context: EdgeContext,
  +folder: DiskletFolder,
  +onCancel: Function,
  +onComplete: Function,
  +recoveryKey?: string,
  +username?: string | null
}

export type GetState = () => State
export type Dispatch = <Return>(
  action:
    | Action
    | ((dispatch: Dispatch, getState: GetState, i: Imports) => Return)
) => Return
