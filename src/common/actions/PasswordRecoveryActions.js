// @flow

import * as actions from '../../common/actions'
import * as Constants from '../../common/constants'
import type { Dispatch, GetState, Imports } from '../../types/ReduxTypes'

export function recoverPasswordLogin () {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const context = imports.context
    const username = state.login.username
    try {
      const recoveryKey = await context.getRecovery2Key(username)
      const userQuestions = await context.fetchRecovery2Questions(
        recoveryKey,
        username
      )
      const obj = {
        recoveryKey,
        userQuestions
      }
      dispatch(
        actions.dispatchActionWithData(
          Constants.ON_RECOVERY_LOGIN_IS_ENABLED,
          obj
        )
      )
    } catch (e) {
      if (e.message === 'No recovery key stored locally.') {
        dispatch(
          actions.dispatchAction(Constants.ON_RECOVERY_LOGIN_NOT_ENABLED)
        )
      }

      console.log('eerr ', e)
    }
  }
}
export function getRecoveryQuestions () {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const context = imports.context
    const username = state.login.username
    const recoveryKey = state.login.recoveryToken
    try {
      const userQuestions = await context.fetchRecovery2Questions(
        recoveryKey,
        username
      )
      const obj = {
        recoveryKey,
        userQuestions
      }
      dispatch(
        actions.dispatchActionWithData(
          Constants.ON_RECOVERY_LOGIN_IS_ENABLED,
          obj
        )
      )
    } catch (e) {
      if (e.message === 'No recovery key stored locally.') {
        dispatch(
          actions.dispatchActionWithData(
            Constants.ON_RECOVERY_LOGIN_NOT_ENABLED,
            e.message
          )
        )
        return
      }
      dispatch(
        actions.dispatchActionWithData(
          Constants.ON_RECOVERY_LOGIN_NOT_ENABLED,
          e.message
        )
      )
      console.log(e)
    }
  }
}

export function initializePasswordRecovery () {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
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
      dispatch(
        actions.dispatchActionWithData(
          Constants.PASSWORD_RECOVERY_INITIALIZED,
          obj
        )
      )
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
    dispatch(
      actions.dispatchActionWithData(
        Constants.PASSWORD_RECOVERY_INITIALIZED,
        obj
      )
    )
  }
}

export function deleteRecovery () {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const account = imports.accountObject
    if (!account) {
      return
    }
    try {
      await account.deleteRecovery()
      dispatch(actions.dispatchAction(Constants.ON_DISABLE_RECOVERY))
    } catch (e) {
      console.log(e)
      console.log(e.title)
      console.log(e.message)
    }
  }
}

export function cancelRecoverySettingsScene () {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    imports.onComplete()
  }
}

export function changeRecoveryAnswers (
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
      dispatch(
        actions.dispatchActionWitString(Constants.ON_RECOVERY_KEY, recoveryKey)
      )
    } catch (e) {
      console.log(e)
      console.log(e.title)
      console.log(e.message)
    }
  }
}
