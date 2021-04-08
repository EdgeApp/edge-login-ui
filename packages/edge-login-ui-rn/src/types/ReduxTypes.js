// @flow

import {
  type EdgeAccount,
  type EdgeAccountOptions,
  type EdgeContext
} from 'edge-core-js'

import { type RootState } from '../reducers/RootReducer.js'
import { type Action } from './ReduxActions.js'

export type { Action, RootState }

export type TouchIdInfo = {|
  isTouchSupported: boolean,
  isTouchEnabled: boolean
|}

export type OnLogin = (account: EdgeAccount, touchIdInfo?: TouchIdInfo) => void

export type Imports = {|
  +accountOptions: EdgeAccountOptions,
  +context: EdgeContext,
  +onComplete: () => void,
  +onLogin?: OnLogin,
  +recoveryKey?: string,
  +skipSecurityAlerts?: boolean,
  +username?: string | null,
  +customPermissionsFunction?: () => void
|}

export type GetState = () => RootState
export type Dispatch = <Return>(
  action:
    | Action
    | ((dispatch: Dispatch, getState: GetState, i: Imports) => Return)
) => Return
