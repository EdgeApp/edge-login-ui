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
      'edge://recovery?token=' +
      token +
      '\n\nAndroid\nhttps://recovery.edgesecure.co/recovery?token=' +
      token
    const to = email
    let subject = 'Edge ' + 'Recovery Token' // this should have a vendors name. Hardcoded Edge
    let body =
      'Please click the link below from a mobile device with Edge installed to initiate account recovery for username ' +
      username +
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
