import { closeLoading, openLoading } from '../../Loader/Loader.action'

/* eslint-disable standard/no-callback-literal */
export const checkPasswordRecovery = (payload, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    dispatch(openLoading())
    if (payload.questions[0] === 'Choose a question') {
      dispatch(closeLoading())
      callback(
        {
          type: 'firstQuestion',
          message: t('activity_recovery_pick_questions_alert')
        },
        null
      )
    }
    if (payload.answers[0].length < 4) {
      dispatch(closeLoading())
      callback(
        {
          type: 'firstAnswer',
          message: t('activity_recovery_error_answer_length')
        },
        null
      )
    }
    if (payload.questions[1] === 'Choose a question') {
      dispatch(closeLoading())
      callback(
        {
          type: 'secondQuestion',
          message: t('activity_recovery_pick_questions_alert')
        },
        null
      )
    }
    if (payload.answers[1].length < 4) {
      dispatch(closeLoading())
      callback(
        {
          type: 'secondAnswer',
          message: t('activity_recovery_error_answer_length')
        },
        null
      )
    }
    if (
      payload.answers[0].length > 3 &&
      payload.answers[1].length > 3 &&
      !payload.questions[0] !== 'Choose a question' &&
      !payload.questions[1] !== 'Choose a question'
    ) {
      payload.account.setupRecovery2Questions(
        payload.questions,
        payload.answers,
        (error, token) => {
          dispatch(closeLoading())
          if (error) {
            return callback(t('server_error_no_connection'), null)
          }
          if (!error) {
            return callback(null, token)
          }
        }
      )
    }
  }
}
