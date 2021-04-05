// @flow

import * as React from 'react'

import s from '../../common/locales/strings.js'
import { Airship, showError } from '../services/AirshipInstance.js'
import { ButtonsModal } from './ButtonsModal.js'

export function showResetModal(requestOtpReset: () => Promise<void>): void {
  Airship.show(bridge => (
    <ButtonsModal
      title={s.strings.disable_otp_header}
      message={s.strings.disable_otp_modal_body}
      buttons={{
        ok: {
          label: s.strings.disable_otp_button,
          onPress: () => requestOtpReset().then(() => true)
        }
      }}
      closeArrow
      bridge={bridge}
    />
  )).catch(showError)
}
