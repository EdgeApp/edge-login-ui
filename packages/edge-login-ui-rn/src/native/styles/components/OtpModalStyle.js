// @flow

import * as Constants from '../../../common/constants'
import { scale } from '../../../common/util/scaling.js'

export const OtpModalStyle = {
  otpResetModalIcon: {
    color: Constants.ACCENT_RED
  },
  otpAuthenticationModalIcon: {
    color: Constants.ACCENT_MINT,
    fontSize: scale(56)
  }
}
