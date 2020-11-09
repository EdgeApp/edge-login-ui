// @flow

import * as React from 'react'
import { type AirshipBridge } from 'react-native-airship'

import s from '../../common/locales/strings.js'
import { type ThemeProps, withTheme } from '../services/ThemeContext.js'
import { EdgeTextField } from './EdgeTextField.js'
import { ModalMessage, ModalTitle } from './ModalParts.js'
import { PrimaryButton, SecondaryButton } from './ThemedButtons.js'
import { ThemedModal } from './ThemedModal.js'

type OwnProps = {
  bridge: AirshipBridge<string | void>,
  buttonLabel: string,
  inputLabel: string,
  message: string,
  isInputPassword?: boolean,
  onSubmit(inputText: string): Promise<string | void>,
  title: string
}

type State = {
  input: string,
  error?: string
}

type Props = OwnProps & ThemeProps

class ThemedInputModalComponent extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  handleInputChange = (input: string) => {
    this.setState({ input })
  }

  handleSubmit = () => {
    const { onSubmit, bridge } = this.props
    this.setState({ error: undefined })
    onSubmit(this.state.input)
      .then((result: string | void) => {
        if (result) {
          bridge.resolve(result)
        }
      })
      .catch(error => {
        this.setState({ error: error.message })
        console.log(error)
      })
  }

  render() {
    const {
      bridge,
      buttonLabel,
      inputLabel,
      message,
      isInputPassword,
      title
    } = this.props
    const { error, input } = this.state
    const close = () => bridge.resolve()
    return (
      <ThemedModal bridge={bridge} onCancel={close}>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message.trim()}</ModalMessage>
        <EdgeTextField
          autoFocus
          error={error}
          label={inputLabel}
          marginRem={0.5}
          onChangeText={this.handleInputChange}
          onSubmitEditing={this.handleSubmit}
          value={input}
          returnKeyType="go"
          secureTextEntry={isInputPassword}
        />
        <PrimaryButton
          label={buttonLabel}
          onPress={this.handleSubmit}
          marginRem={0.5}
        />
        <SecondaryButton
          label={s.strings.cancel}
          onPress={close}
          marginRem={0.5}
        />
      </ThemedModal>
    )
  }
}

export const ThemedInputModal = withTheme(ThemedInputModalComponent)
