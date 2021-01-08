// @flow

import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'

export const changePassword = (password: string) => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
): Promise<void> => {
  const account = imports.accountObject
  if (account == null) return
  await account.changePassword(password)
}

export const recoveryChangePassword = (password: string) => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
): Promise<void> => {
  const state = getState()
  const { account } = state.login
  await account.changePassword(password)
}

export const recoveryChangePIN = (pin: string) => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
): Promise<void> => {
  const state = getState()
  const { account } = state.login
  await account.changePin({ pin })
}

export const changePIN = (pin: string) => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
): Promise<void> => {
  const account = imports.accountObject
  if (account == null) return
  await account.changePin({ pin })
}
