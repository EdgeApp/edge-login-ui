// @flow

import type { DiskletFolder } from 'disklet'
import type { EdgeAccount, EdgeAccountOptions, EdgeContext } from 'edge-core-js'

import { type RootState } from '../reducers/RootReducer.js'
import { type Action } from './ReduxActions.js'

export type { Action, RootState }

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

export type GetState = () => RootState
export type Dispatch = <Return>(
  action:
    | Action
    | ((dispatch: Dispatch, getState: GetState, i: Imports) => Return)
) => Return
