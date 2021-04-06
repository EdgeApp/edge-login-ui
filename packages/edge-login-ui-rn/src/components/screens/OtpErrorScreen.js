// @flow

import { type OtpError } from 'edge-core-js'
import * as React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { sprintf } from 'sprintf-js'

import { login } from '../../actions/LoginAction.js'
import {
  hasReadyVoucher,
  requestOtpReset
} from '../../actions/LoginOtpActions.js'
import s from '../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { type LoginAttempt } from '../../util/loginAttempt.js'
import { makePeriodicTask } from '../../util/periodicTask.js'
import { showResetModal } from '../modals/OtpResetModal.js'
import { QrCodeModal } from '../modals/QrCodeModal.js'
import { TextInputModal } from '../modals/TextInputModal.js'
import { Airship, showError, showToast } from '../services/AirshipInstance.js'
import { connect } from '../services/ReduxStore.js'
import { DividerRow } from '../themed/DividerRow.js'
import { IconHeaderRow } from '../themed/IconHeaderRow.js'
import { LinkRow } from '../themed/LinkRow.js'
import { ThemedScene } from '../themed/ThemedScene.js'
import { MessageText, Warning } from '../themed/ThemedText.js'

type OwnProps = {}
type StateProps = {
  otpError: OtpError,
  otpAttempt: LoginAttempt,
  otpResetDate?: Date
}
type DispatchProps = {
  onBack(): void,
  hasReadyVoucher(otpError: OtpError): Promise<boolean>,
  login(otpAttempt: LoginAttempt, otpKey?: string): Promise<void>,
  requestOtpReset(): Promise<void>,
  saveOtpError(otpAttempt: LoginAttempt, otpError: OtpError): void
}
type Props = OwnProps & StateProps & DispatchProps

class OtpErrorScreenComponent extends React.Component<Props> {
  checkVoucher = makePeriodicTask(async () => {
    const {
      hasReadyVoucher,
      login,
      otpAttempt,
      otpError,
      saveOtpError
    } = this.props

    try {
      const result = await hasReadyVoucher(otpError)
      if (result) {
        showToast(s.strings.otp_screen_retrying)
        await login(otpAttempt)
      }
    } catch (error) {
      if (error != null && error.name === 'OtpError') {
        saveOtpError(otpAttempt, error)
      } else {
        showError(error)
      }
    }
  }, 5000)

  componentDidMount() {
    this.checkVoucher.start()
  }

  componentWillUnmount() {
    this.checkVoucher.stop()
  }

  handleBackupModal = () => {
    const { login, otpAttempt, saveOtpError } = this.props

    const handleSubmit = async (otpKey: string): Promise<boolean | string> => {
      try {
        this.checkVoucher.stop()
        await login(otpAttempt, otpKey)
        return true
      } catch (error) {
        // Restart the background checking if the login failed:
        this.checkVoucher.start()

        // Translate known errors:
        if (error != null && error.name === 'OtpError') {
          saveOtpError(otpAttempt, error)
          return s.strings.backup_key_incorrect
        }
        if (error != null && error.message === 'Unexpected end of data') {
          return s.strings.backup_key_incorrect
        }
        showError(error)
        return false
      }
    }

    Airship.show(bridge => (
      <TextInputModal
        bridge={bridge}
        onSubmit={handleSubmit}
        title={s.strings.otp_backup_code_modal_title}
        message={s.strings.otp_instructions}
        inputLabel={s.strings.backup_key_label}
        submitLabel={s.strings.submit}
        autoCapitalize="characters"
        returnKeyType="done"
      />
    ))
  }

  handleQrModal = () => {
    Airship.show(bridge => <QrCodeModal bridge={bridge} />)
  }

  render() {
    const { otpError, otpResetDate } = this.props
    const isIp = otpError.reason === 'ip'

    // Find the automatic login date:
    let date = otpResetDate
    if (otpError.voucherActivates != null) date = otpError.voucherActivates

    return (
      <ThemedScene
        showHeader
        onBack={this.props.onBack}
        subTitle=""
        title={isIp ? s.strings.otp_header_ip : s.strings.otp_header}
      >
        <IconHeaderRow
          renderIcon={theme => (
            <Warning>
              <FontAwesome name="exclamation-triangle" size={theme.rem(2.5)} />
            </Warning>
          )}
        >
          <MessageText>
            <Warning>
              {isIp
                ? s.strings.otp_screen_header_ip
                : s.strings.otp_screen_header_2fa}
            </Warning>
          </MessageText>
        </IconHeaderRow>
        <DividerRow label={s.strings.to_fix} />
        <MessageText>{s.strings.otp_screen_approve}</MessageText>
        <DividerRow />
        <LinkRow label={s.strings.otp_screen_qr} onPress={this.handleQrModal} />
        {isIp ? null : (
          <>
            <DividerRow />
            <LinkRow
              label={s.strings.otp_backup_code_modal_title}
              onPress={this.handleBackupModal}
            />
          </>
        )}
        {date == null ? null : (
          <>
            <DividerRow />
            <MessageText>
              {sprintf(s.strings.otp_screen_wait, date.toLocaleString())}
            </MessageText>
          </>
        )}
        {otpError.resetToken == null || date != null ? null : (
          <>
            <DividerRow />
            <LinkRow
              label={s.strings.disable_otp_button_two}
              onPress={() => showResetModal(this.props.requestOtpReset)}
            />
          </>
        )}
      </ThemedScene>
    )
  }
}

export const OtpErrorScreen = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => {
    const { otpAttempt, otpError, otpResetDate } = state.login
    if (otpAttempt == null || otpError == null) {
      throw new Error('Missing OtpError for OTP error screen')
    }
    return { otpAttempt, otpError, otpResetDate }
  },
  (dispatch: Dispatch) => ({
    onBack() {
      dispatch({ type: 'START_PASSWORD_LOGIN' })
    },
    hasReadyVoucher(error: OtpError) {
      return dispatch(hasReadyVoucher(error))
    },
    login(attempt: LoginAttempt, otpKey?: string): Promise<void> {
      return dispatch(login(attempt, otpKey))
    },
    requestOtpReset() {
      return dispatch(requestOtpReset())
    },
    saveOtpError(attempt, error) {
      dispatch({ type: 'OTP_ERROR', data: { attempt, error } })
    }
  })
)(OtpErrorScreenComponent)
