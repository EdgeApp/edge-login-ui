// @flow

import * as React from 'react'
import { type AirshipBridge } from 'react-native-airship'

import { requestOtpReset } from '../../actions/LoginOtpActions.js'
import s from '../../common/locales/strings.js'
import type { Dispatch, RootState } from '../../types/ReduxTypes.js'
import { showError, showToast } from '../services/AirshipInstance.js'
import { connect } from '../services/ReduxStore.js'
import { ModalCloseArrow } from '../themed/ModalParts.js'
import { PrimaryButton } from '../themed/ThemedButtons.js'
import { ThemedModal } from '../themed/ThemedModal.js'
import { MessageText, TitleText } from '../themed/ThemedText.js'

type OwnProps = {
  bridge: AirshipBridge<void>
}
type DispatchProps = {
  requestOtpReset(): Promise<void>
}
type Props = OwnProps & DispatchProps

type State = {
  spinning: boolean
}

class OtpResetModalComponent extends React.Component<Props, State> {
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
    const { bridge } = this.props
    const { spinning } = this.state

    return (
      <ThemedModal bridge={bridge} onCancel={this.handleCancel} paddingRem={1}>
        <TitleText>{s.strings.disable_otp_header}</TitleText>
        <MessageText>{s.strings.disable_otp_modal_body}</MessageText>
        {spinning ? (
          <PrimaryButton marginRem={0.5} spinning />
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

export const OtpResetModal = connect<{}, DispatchProps, OwnProps>(
  (state: RootState) => ({}),
  (dispatch: Dispatch): DispatchProps => ({
    requestOtpReset() {
      return dispatch(requestOtpReset())
    }
  })
)(OtpResetModalComponent)
