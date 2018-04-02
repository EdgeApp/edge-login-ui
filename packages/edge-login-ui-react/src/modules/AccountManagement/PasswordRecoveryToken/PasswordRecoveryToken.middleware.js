import { obfuscateUsername, validateEmail } from '../../../lib/helper'

export const checkEmail = (
  address,
  email,
  token,
  accountUsername,
  callback
) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    if (!validateEmail(email)) {
      return callback(t('password_recovery_invalid_email'), null)
    }
    if (validateEmail(email)) {
      return dispatch(
        processEmail(address, email, token, accountUsername, callback)
      )
    }
  }
}

const processEmail = (address, email, token, accountUsername, callback) => {
  return (dispatch, getState, imports) => {
    const username = obfuscateUsername(accountUsername)
    const mobileLink =
      'iOS\n' +
      'airbitz' +
      '://recovery?token=' +
      token +
      '\n\nAndroid\nhttps://recovery.airbitz.co/recovery?token=' +
      token
    const to = email
    let subject = 'Airbitz ' + 'Recovery Token' // this should have a vendors name. Hardcoded Airbitz
    let body =
      'To recover your account, install the ' +
      'Airbitz' +
      ' Mobile App on iOS or Android from https://airbitz.co/app\n\nPlease click one of the links below from a device with ' +
      'Airbitz' +
      ' installed to initiate account recovery for username [' +
      username +
      '] ' +
      '\n\n' +
      mobileLink
    subject = encodeURI(subject)
    body = encodeURI(body)
    body = body.replace('index.html#', 'index.html%23')

    switch (address) {
      case 'google': {
        const url =
          'https://mail.google.com/mail/?view=cm&fs=1&to=' +
          to +
          '&su=' +
          subject +
          '&body=' +
          body
        callback(null, url)
        break
      }
      case 'yahoo': {
        const url =
          'http://compose.mail.yahoo.com/?to=' +
          to +
          '&subj=' +
          subject +
          '&body=' +
          body
        callback(null, url)
        break
      }
      case 'microsoft': {
        const url =
          'https://mail.live.com/default.aspx?rru=compose&to=' +
          to +
          '&subject=' +
          subject +
          '&body=' +
          body
        callback(null, url)
        break
      }
      case 'generic': {
        const url = 'mailto:' + to + '?subject=' + subject + '&body=' + body
        callback(null, url)
        break
      }
    }
  }
}
