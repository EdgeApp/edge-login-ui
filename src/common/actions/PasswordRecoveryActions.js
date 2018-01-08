import * as Constants from '../../common/constants'
import * as actions from '../../common/actions'
export function forgotPassword () {
  return async (dispatch, getState, imports) => {

  }
}

export function initializePasswordRecovery (account) {
  return async (dispatch, getState, imports) => {
    const context = imports.context
    const questionsList = await context.listRecoveryQuestionChoices()
    /* const recoveryKey = await context.getRecovery2Key(account.username)
    if (recoveryKey) {

    } */
    // const userQuestions = await context.fetchRecovery2Questions(recoveryKey, account.username)

    const obj = {
      questionsList
    }
    dispatch(actions.dispatchActionWithData(Constants.PASSWORD_RECOVERY_INITIALIZED, obj))
  }
}
