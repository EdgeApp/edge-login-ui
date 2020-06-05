// @flow

import * as Constants from '../../../common/constants'
import { scale } from '../../../common/util/scaling.js'

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
