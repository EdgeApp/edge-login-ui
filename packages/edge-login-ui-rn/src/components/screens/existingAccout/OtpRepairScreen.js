// @flow

import { type EdgeAccount, type OtpError } from 'edge-core-js'
import * as React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { sprintf } from 'sprintf-js'

import { onComplete } from '../../../actions/WorkflowActions.js'
import s from '../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { OtpResetModal } from '../../modals/OtpResetModal.js'
import { QrCodeModal } from '../../modals/QrCodeModal.js'
import { TextInputModal } from '../../modals/TextInputModal.js'
import { Airship, showError } from '../../services/AirshipInstance.js'
import { connect } from '../../services/ReduxStore.js'
import { DividerRow } from '../../themed/DividerRow.js'
import { IconHeaderRow } from '../../themed/IconHeaderRow.js'
import { LinkRow } from '../../themed/LinkRow.js'
import { ThemedScene } from '../../themed/ThemedScene.js'
import { MessageText } from '../../themed/ThemedText.js'

type OwnProps = {}
type StateProps = {
  account: EdgeAccount,
  otpError: OtpError,
  otpResetDate?: Date
}
type DispatchProps = {
  onBack(): void,
  saveOtpError(account: EdgeAccount, otpError: OtpError): void
}
type Props = OwnProps & StateProps & DispatchProps

class OtpRepairScreenComponent extends React.Component<Props> {
  handleBackupModal = () => {
    const { account, onBack, saveOtpError } = this.props

    const handleSubmit = async (otpKey: string): Promise<boolean | string> => {
      try {
        const typeHack: any = account
        if (typeHack.repairOtp == null) {
          throw new Error('Wrong edge-core-js version')
        }
        await typeHack.repairOtp(otpKey)
        onBack()
        return true
      } catch (error) {
        // Translate known errors:
        if (error != null && error.name === 'OtpError') {
          saveOtpError(account, error)
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

  handleResetModal = () => {
    Airship.show(bridge => <OtpResetModal bridge={bridge} />)
  }

  handleQrModal = () => {
    Airship.show(bridge => <QrCodeModal bridge={bridge} />)
  }

  render() {
    const { otpError } = this.props
    const isIp = otpError.reason === 'ip'

    return (
      <ThemedScene
        showHeader
        onBack={this.props.onBack}
        subTitle=""
        title={s.strings.otp_header_repair}
      >
        <IconHeaderRow
          renderIcon={theme => (
            <FontAwesome name="exclamation-triangle" size={theme.rem(2.5)} />
          )}
        >
          <MessageText>{s.strings.otp_repair_header}</MessageText>
        </IconHeaderRow>
        <MessageText>{s.strings.otp_repair_options}</MessageText>
        <MessageText>{s.strings.otp_screen_approve}</MessageText>
        <DividerRow />
        <LinkRow
          label={s.strings.qr_modal_title}
          onPress={this.handleQrModal}
        />
        {isIp ? null : (
          <LinkRow
            label={s.strings.otp_backup_code_modal_title}
            onPress={this.handleBackupModal}
          />
        )}
        {this.renderResetArea()}
      </ThemedScene>
    )
  }

  renderResetArea(): React.Node {
    const { otpError, otpResetDate } = this.props

    // If we have an automatic login date, show that:
    let date = otpResetDate
    if (otpError.voucherActivates != null) date = otpError.voucherActivates
    if (date != null) {
      return (
        <>
          <DividerRow />
          <MessageText>
            {sprintf(s.strings.otp_screen_wait, date.toLocaleString())}
          </MessageText>
        </>
      )
    }

    // Otherwise, there is nothing to show here:
    return null
  }
}

export const OtpRepairScreen = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => {
    const { account } = state
    const { otpError, otpResetDate } = state.login
    if (account == null || otpError == null) {
      throw new Error('Missing OtpError for OTP repair screen')
    }
    return { account, otpError, otpResetDate }
  },
  (dispatch: Dispatch) => ({
    onBack() {
      dispatch(onComplete())
    },
    saveOtpError(account, error) {
      dispatch({ type: 'START_OTP_REPAIR', data: { account, error } })
    }
  })
)(OtpRepairScreenComponent)
