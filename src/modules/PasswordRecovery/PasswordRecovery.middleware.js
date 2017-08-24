import { validateEmail, obfuscateUsername } from '../../lib/helper'
import { setPasswordRecoveryToken, showPasswordRecoveryTokenButton } from './PasswordRecovery.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'

export const checkPasswordRecovery = (payload, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    dispatch(openLoading())
    if (payload.questions[0] === 'Choose a question') {
      dispatch(closeLoading())
      return callback({
        type: 'firstQuestion',
        message: t('activity_recovery_pick_questions_alert')
      })
    }
    if (payload.answers[0].length < 4) {
      dispatch(closeLoading())
      return callback({
        type: 'firstAnswer',
        message: t('activity_recovery_error_answer_length')
      })
    }
    if (payload.questions[1] === 'Choose a question') {
      dispatch(closeLoading())
      return callback({
        type: 'secondQuestion',
        message: t('activity_recovery_pick_questions_alert')
      })
    }
    if (payload.answers[1].length < 4) {
      dispatch(closeLoading())
      return callback({
        type: 'secondAnswer',
        message: t('activity_recovery_error_answer_length')
      })
    }
    if (!payload.answers[0].length < 4 && !payload.answers[1].length < 4 && !payload.questions[0] === 'Choose a question' && !payload.questions[1] === 'Choose a question') {
      payload.account.setupRecovery2Questions(payload.questions, payload.answers, (error, token) => {
        dispatch(closeLoading())
        if (error) {
          callback(error)
          return callback(t('server_error_no_connection'))
        }
        if (!error) {
          dispatch(setPasswordRecoveryToken(token))
          return callback(null)
          // return dispatch(showPasswordRecoveryTokenView())
        }
      })
    }
  }
}

export const checkEmail = (address, email, token, accountUsername, callback) => {
  return (dispatch, getState, imports) => {
    if (validateEmail(email)) {
      return dispatch(
        processEmail(
          address,
          email,
          token,
          accountUsername,
          callback
        )
      )
    }
    if (!validateEmail(email)) {
      // return dispatch(openErrorModal(t('password_recovery_invalid_email')))
    }
  }
}

const processEmail = (address, email, token, accountUsername, callback) => {
  return (dispatch, getState, imports) => {
    const username = obfuscateUsername(accountUsername)
    const mobileLink = 'iOS\n' + 'airbitz' + '://recovery?token=' + token +
        '\n\nAndroid\nhttps://recovery.airbitz.co/recovery?token=' + token
    const to = email
    let subject = 'Airbitz ' + 'Recovery Token' // this should have a vendors name. Hardcoded Airbitz
    let body = 'To recover your account, install the ' + 'Airbitz' +
        ' Mobile App on iOS or Android from https://airbitz.co/app\n\nPlease click one of the links below from a device with ' +
        'Airbitz' + ' installed to initiate account recovery for username [' + username + '] ' +
        '\n\n' + mobileLink
    subject = encodeURI(subject)
    body = encodeURI(body)
    body = body.replace('index.html#', 'index.html%23')

    switch (address) {
      case 'google': {
        const url = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&su=' + subject + '&body=' + body
        callback(url)
        break
      }
      case 'yahoo': {
        const url = 'http://compose.mail.yahoo.com/?to=' + to + '&subj=' + subject + '&body=' + body
        callback(url)
        break
      }
      case 'microsoft': {
        const url = 'https://mail.live.com/default.aspx?rru=compose&to=' + to + '&subject=' + subject + '&body=' + body
        callback(url)
        break
      }
      case 'generic': {
        const url = 'mailto:' + to + '?subject=' + subject + '&body=' + body
        callback(url)
        break
      }
      default:
        return null
    }

    return dispatch(showPasswordRecoveryTokenButton())
  }
}
