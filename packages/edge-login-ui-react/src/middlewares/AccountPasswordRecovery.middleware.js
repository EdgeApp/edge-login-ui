import { closeLoading, openLoading } from '../actions/Loader.action'
import { errorHandling } from '../lib/helper'

export const checkAndChangePasswordRecovery = (payload, callback) => {
  return (dispatch, _, imports) => {
    const t = imports.t
    dispatch(openLoading())
    if (
      payload.questions[0] === t('account_password_recovery_default_question')
    ) {
      dispatch(closeLoading())
      callback(
        {
          type: 'firstQuestion',
          message: t('error_password_recovery_pick_question')
        },
        null
      )
    }
    if (payload.answers[0].length < 4) {
      dispatch(closeLoading())
      callback(
        {
          type: 'firstAnswer',
          message: t('error_password_recovery_insufficient_answer')
        },
        null
      )
    }
    if (
      payload.questions[1] === t('account_password_recovery_default_question')
    ) {
      dispatch(closeLoading())
      callback(
        {
          type: 'secondQuestion',
          message: t('error_password_recovery_pick_question')
        },
        null
      )
    }
    if (payload.answers[1].length < 4) {
      dispatch(closeLoading())
      callback(
        {
          type: 'secondAnswer',
          message: t('error_password_recovery_insufficient_answer')
        },
        null
      )
    }
    // Check if answers and questions have no errors, submit to change recovery questions.
    // Separate from the checks because I am not returning separate error one at a time but
    // can callback multiple errors at parallel.
    if (
      payload.answers[0].length > 3 &&
      payload.answers[1].length > 3 &&
      payload.questions[0] !==
        t('account_password_recovery_default_question') &&
      payload.questions[1] !== t('account_password_recovery_default_question')
    ) {
      payload.account
        .changeRecovery(payload.questions, payload.answers)
        .then(token => {
          dispatch(closeLoading())
          return callback(null, token)
        })
        .catch(error => {
          dispatch(closeLoading())
          return callback(t(errorHandling(error.name)), null)
        })
    }
  }
}
