// @flow

import * as React from 'react'
import { Platform, View } from 'react-native'
import { type AirshipBridge } from 'react-native-airship'

import s from '../../common/locales/strings.js'
import { ThemedTextField } from '../../components/themed/ThemedTextField.js'
import { showError } from '../services/AirshipInstance.js'
import {
  ModalCloseArrow,
  ModalMessage,
  ModalTitle
} from '../themed/ModalParts.js'
import { PrimaryButton } from '../themed/ThemedButtons.js'
import { ThemedModal } from '../themed/ThemedModal.js'

type Props = {|
  // Resolves to the entered string, or void if cancelled.
  bridge: AirshipBridge<string | void>,

  // The modal will show a spinner as long as this promise is pending.
  // If the promise returns a string, we will use that as the error text
  // and leave the modal showing. Otherwise, the modal will resolve itself.
  onSubmit?: (text: string) => Promise<string | void>,

  // Text to show in the modal:
  title?: string,
  message?: string,
  inputLabel: string,
  submitLabel?: string,

  // Text input options:
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
  autoCorrect?: boolean,
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad',
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send',
  secureTextEntry?: boolean
|}

type State = {
  errorMessage?: string,
  text: string,
  spinning: boolean
}

export class TextInputModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { spinning: false, text: '' }
  }

  handleCancel = () => {
    const { bridge } = this.props
    if (!this.state.spinning) bridge.resolve(undefined)
  }

  handleChangeText = (text: string) => this.setState({ text })

  handleSubmit = () => {
    const { bridge, onSubmit } = this.props

    if (onSubmit != null) {
      this.setState({ spinning: true })
      onSubmit(this.state.text).then(
        result => {
          if (result != null) {
            this.setState({ spinning: false, errorMessage: result })
          } else {
            bridge.resolve(this.state.text)
          }
        },
        error => {
          this.setState({ spinning: false })
          showError(error)
        }
      )
    }
  }

  render() {
    const {
      bridge,
      inputLabel,
      message,
      submitLabel = s.strings.submit,
      title,
      autoCapitalize,
      autoCorrect,
      keyboardType,
      returnKeyType,
      secureTextEntry
    } = this.props
    const { errorMessage, text, spinning } = this.state

    return (
      <ThemedModal bridge={bridge} onCancel={this.handleCancel}>
        {title != null ? <ModalTitle>{title}</ModalTitle> : null}
        {message != null ? <ModalMessage>{message}</ModalMessage> : null}
        <ThemedTextField
          // Text input props:
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          label={inputLabel}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          // Our props:
          autoFocus
          error={errorMessage}
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmit}
          value={text}
        />
        {// Hack around the Android keyboard glitch:
        Platform.OS === 'android' ? <View style={{ flex: 1 }} /> : null}
        {spinning ? (
          <PrimaryButton marginRem={0.5} spinner />
        ) : (
          <PrimaryButton
            label={submitLabel}
            marginRem={0.5}
            onPress={this.handleSubmit}
          />
        )}
        <ModalCloseArrow onPress={this.handleCancel} />
      </ThemedModal>
    )
  }
}
