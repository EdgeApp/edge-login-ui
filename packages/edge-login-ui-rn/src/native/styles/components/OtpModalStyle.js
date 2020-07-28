// @flow

import * as Constants from '../../../constants/index.js'
import { scale } from '../../../util/scaling.js'

export const OtpModalStyle = {
  otpResetModalIcon: {
    color: Constants.ACCENT_RED,
    fontSize: scale(25)
  },
  otpAuthenticationModalIcon: {
    color: Constants.ACCENT_MINT,
    fontSize: scale(56)
  }
}
