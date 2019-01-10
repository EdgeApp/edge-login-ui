import { Alert } from 'react-native'
import { sprintf } from 'sprintf-js'

import s from '../locales/strings.js'

const checkingForOTP = context => {
  const accountsPendingReset = []
  let arrayString = ''
  context
    .fetchLoginMessages()
    .then(async accounts => {
      for (const key in accounts) {
        const account = accounts[key]
        if (account.otpResetPending) {
          accountsPendingReset.push(key)
          arrayString = arrayString + (key + ', ')
        }
      }
      if (accountsPendingReset.length > 0) {
        arrayString = arrayString.slice(0, -2)
        Alert.alert(
          s.strings.otp_modal_reset_headline,
          sprintf(s.strings.otp_modal_reset_body, arrayString)
        )
      }
    })
    .catch(e => {
      console.log('CH: error', e)
      return {}
    })
}

export { checkingForOTP }
