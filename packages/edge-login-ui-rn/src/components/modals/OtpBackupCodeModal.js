// @flow

import { type OtpError } from 'edge-core-js'
import React, { Component } from 'react'
import { type AirshipBridge } from 'react-native-airship'

import { login } from '../../actions/LoginAction.js'
import s from '../../common/locales/strings.js'
import { FormField } from '../../components/common/index.js'
import type { Dispatch, RootState } from '../../types/ReduxTypes.js'
import { type LoginAttempt } from '../../util/loginAttempt.js'
import { connect } from '../services/ReduxStore.js'
import { type ThemeProps, withTheme } from '../services/ThemeContext.js'
import {
  ModalCloseArrow,
  ModalMessage,
  ModalTitle
} from '../themed/ModalParts.js'
import { PrimaryButton } from '../themed/ThemedButtons.js'
import { ThemedModal } from '../themed/ThemedModal.js'

type OwnProps = {
  bridge: AirshipBridge<void>,
  otpAttempt: LoginAttempt
}
type StateProps = {}
type DispatchProps = {
  login(attempt: LoginAttempt, otpKey: string): Promise<void>,
  saveOtpError(otpAttempt: LoginAttempt, otpError: OtpError): void
}
type Props = OwnProps & StateProps & DispatchProps & ThemeProps

type State = {
  errorMessage?: string,
  otpKey: string,
  spinning: boolean
}

class OtpBackupCodeModalComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { otpKey: '', spinning: false }
  }

  handleCancel = () => {
    const { bridge } = this.props
    if (!this.state.spinning) bridge.resolve()
  }

  handleChangeText = (otpKey: string) => this.setState({ otpKey })

  handleSubmit = () => {
    const { bridge, otpAttempt, login, saveOtpError } = this.props
    const { otpKey } = this.state

    this.setState({ errorMessage: undefined, spinning: true })
    login(otpAttempt, otpKey).then(
      () => bridge.resolve(),
      error => {
        if (error != null && error.name === 'OtpError') {
          saveOtpError(otpAttempt, error)
        }
        const errorMessage =
          error != null
            ? error.name === 'OtpError' ||
              error.message === 'Unexpected end of data'
              ? s.strings.backup_key_incorrect
              : error.message
            : 'Unknown error'
        this.setState({ errorMessage, spinning: false })
      }
    )
  }

  render() {
    const { bridge, theme } = this.props
    const { errorMessage, otpKey, spinning } = this.state

    const modalInputStyle = {
      container: { margin: theme.rem(0.5) },
      baseColor: theme.primaryText,
      tintColor: theme.primaryText,
      errorColor: theme.dangerText,
      textColor: theme.primaryText,
      titleTextStyle: {
        color: theme.primaryText,
        fontFamily: theme.fontFamily
      }
    }

    return (
      <ThemedModal bridge={bridge} onCancel={this.handleCancel}>
        <ModalTitle>{s.strings.otp_backup_code_modal_title}</ModalTitle>
        <ModalMessage>{s.strings.otp_instructions}</ModalMessage>
        <FormField
          autoCapitalize="characters"
          autoFocus
          error={errorMessage}
          label={s.strings.backup_key_label}
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmit}
          returnKeyType="next"
          style={modalInputStyle}
          value={otpKey}
        />
        {otpKey.length < 16 ? null : spinning ? (
          <PrimaryButton marginRem={0.5} spinner />
        ) : (
          <PrimaryButton
            label={s.strings.submit}
            marginRem={0.5}
            onPress={this.handleSubmit}
          />
        )}
        <ModalCloseArrow onPress={this.handleCancel} />
      </ThemedModal>
    )
  }
}

export const OtpBackupCodeModal = withTheme(
  connect<StateProps, DispatchProps, OwnProps & ThemeProps>(
    (state: RootState) => ({}),
    (dispatch: Dispatch) => ({
      login(attempt: LoginAttempt, otpKey: string) {
        return dispatch(login(attempt, otpKey))
      },
      saveOtpError(attempt, error) {
        dispatch({ type: 'OTP_ERROR', data: { attempt, error } })
      }
    })
  )(OtpBackupCodeModalComponent)
)
