// @flow

import { type EdgeAccount } from 'edge-core-js'

import { showError } from '../components/services/AirshipInstance.js'
import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'

/**
 * Prepares what is needed for the change recovery scene.
 */
export const initializeChangeRecovery = (account: EdgeAccount) => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  const { context } = imports

  const questionsList = await context.listRecoveryQuestionChoices()

  // Get the user's questions:
  let userQuestions = []
  const recoveryKey = account.recoveryKey
  if (recoveryKey != null) {
    try {
      userQuestions = await context.fetchRecovery2Questions(
        recoveryKey,
        account.username
      )
    } catch (error) {
      showError(error)
    }
  }

  dispatch({
    type: 'START_CHANGE_RECOVERY',
    data: { questionsList, userQuestions, account }
  })
}

export function deleteRecovery() {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { account } = getState()
    if (account == null) return

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

export function changeRecoveryAnswers(questions: string[], answers: string[]) {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { account } = getState()
    if (account == null) return

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
