// @flow

import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import { type AirshipBridge } from 'react-native-airship'

import { requestOtpReset } from '../../actions/LoginOtpActions.js'
import s from '../../common/locales/strings.js'
import type { Dispatch, RootState } from '../../types/ReduxTypes.js'
import { showError, showToast } from '../services/AirshipInstance.js'
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
  bridge: AirshipBridge<void>
}
type DispatchProps = {
  requestOtpReset(): Promise<void>
}
type Props = OwnProps & DispatchProps & ThemeProps

type State = {
  spinning: boolean
}

class OtpResetModalComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { spinning: false }
  }

  handleCancel = () => {
    const { bridge } = this.props
    if (!this.state.spinning) bridge.resolve()
  }

  handleSubmit = () => {
    const { bridge, requestOtpReset } = this.props

    this.setState({ spinning: true })
    requestOtpReset().then(
      () => {
        showToast(s.strings.otp_dispable_req_sent)
        bridge.resolve()
      },
      error => {
        showError(error)
        this.setState({ spinning: false })
      }
    )
  }

  render() {
    const { bridge, theme } = this.props
    const { spinning } = this.state

    return (
      <ThemedModal bridge={bridge} onCancel={this.handleCancel} paddingRem={1}>
        <ModalTitle>{s.strings.disable_otp_header}</ModalTitle>
        <ModalMessage>{s.strings.disable_otp_modal_body}</ModalMessage>
        {spinning ? (
          <PrimaryButton marginRem={0.5}>
            <ActivityIndicator
              color={theme.primaryText}
              style={{ height: theme.rem(2) }}
            />
          </PrimaryButton>
        ) : (
          <PrimaryButton
            label={s.strings.disable_otp_button}
            marginRem={0.5}
            onPress={this.handleSubmit}
          />
        )}
        <ModalCloseArrow onPress={this.handleCancel} />
      </ThemedModal>
    )
  }
}

export const OtpResetModal = withTheme(
  connect<{}, DispatchProps, OwnProps & ThemeProps>(
    (state: RootState) => ({}),
    (dispatch: Dispatch): DispatchProps => ({
      requestOtpReset() {
        return dispatch(requestOtpReset())
      }
    })
  )(OtpResetModalComponent)
)
