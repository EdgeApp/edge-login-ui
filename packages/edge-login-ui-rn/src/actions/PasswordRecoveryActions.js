// @flow

import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'

/**
 * Prepares what is needed for the recovery login scene.
 */
export function getRecoveryQuestions() {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const context = imports.context
    const username = state.login.username
    const recoveryKey = state.login.recoveryToken || ''
    try {
      const userQuestions = await context.fetchRecovery2Questions(
        recoveryKey,
        username
      )
      const obj = {
        recoveryKey,
        userQuestions
      }
      dispatch({ type: 'ON_RECOVERY_LOGIN_IS_ENABLED', data: obj })
    } catch (e) {
      if (e.message === 'No recovery key stored locally.') {
        dispatch({ type: 'ON_RECOVERY_LOGIN_NOT_ENABLED', data: e.message })
        return
      }
      dispatch({ type: 'ON_RECOVERY_LOGIN_NOT_ENABLED', data: e.message })
      console.log(e)
    }
  }
}

/**
 * Prepares what is needed for the change recovery scene.
 */
export function initializeChangeRecovery() {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    dispatch({ type: 'WORKFLOW_START', data: 'changeRecoveryWF' })

    const context = imports.context
    const account = imports.accountObject
    if (!account) {
      return
    }
    const questionsList = await context.listRecoveryQuestionChoices()
    try {
      const recoveryKey = await context.getRecovery2Key(account.username)
      if (recoveryKey) {
        console.log('Recovery Key ')
      }
      const userQuestions = await context.fetchRecovery2Questions(
        recoveryKey,
        account.username
      )
      const obj = {
        questionsList,
        userQuestions,
        account,
        username: account.username
      }
      dispatch({ type: 'PASSWORD_RECOVERY_INITIALIZED', data: obj })
      return
    } catch (e) {
      console.log(e)
      console.log(e.title)
      console.log(e.message)
    }

    // const userQuestions = await context.fetchRecovery2Questions(recoveryKey, account.username)

    const obj = {
      questionsList,
      userQuestions: [],
      account: null,
      username: account.username
    }
    dispatch({ type: 'PASSWORD_RECOVERY_INITIALIZED', data: obj })
  }
}

export function deleteRecovery() {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const account = imports.accountObject
    if (!account) {
      return
    }
    try {
      await account.deleteRecovery()
      dispatch({ type: 'ON_DISABLE_RECOVERY' })
    } catch (e) {
      console.log(e)
      console.log(e.title)
      console.log(e.message)
    }
  }
}

export function cancelRecoverySettingsScene() {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    imports.onComplete()
  }
}

export function changeRecoveryAnswers(
  questions: Array<string>,
  answers: Array<string>
) {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const account = imports.accountObject
    if (!account) {
      return
    }
    try {
      const recoveryKey = await account.changeRecovery(questions, answers)
      dispatch({ type: 'ON_RECOVERY_KEY', data: recoveryKey })
    } catch (e) {
      console.log(e)
      console.log(e.title)
      console.log(e.message)
    }
  }
}
