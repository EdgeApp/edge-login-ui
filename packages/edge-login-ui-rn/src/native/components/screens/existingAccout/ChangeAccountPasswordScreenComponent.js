// @flow

import React, { Component } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'

import s from '../../../../common/locales/strings.js'
import { scale } from '../../../../common/util/index.js'
import ChangePasswordModalConnector from '../../../connectors/abSpecific/ChangePasswordModalConnector'
import PasswordStatusConnector from '../../../connectors/abSpecific/PasswordStatusConnector'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnectorChangeApps'
import PasswordConfirmConnector from '../../../connectors/componentConnectors/PasswordConfirmConnector'
import PasswordConnector from '../../../connectors/componentConnectors/PasswordConnector.js'
import { Button } from '../../common'

export type OwnProps = {
  showHeader: boolean,
  styles: Object
}
type StateProps = {
  password: string,
  passwordStatus: Object,
  confirmPassword: string,
  createPasswordErrorMessage?: string,
  workflow: Object,
  showModal: boolean,
  error?: string,
  error2?: string
}

type DispatchProps = {
  checkTheConfirmPassword(): void,
  changePassword(string): void
}

type Props = OwnProps & StateProps & DispatchProps

type State = {
  focusFirst: boolean,
  focusSecond: boolean,
  isProcessing: boolean
}

export default class ChangeAccountPasswordScreenComponent extends Component<
  Props,
  State
> {
  constructor (props: Props) {
    super(props)
    this.state = {
      isProcessing: false,
      focusFirst: true,
      focusSecond: false
    }
  }

  onSetNextFocus = () => {
    this.setState({
      focusFirst: false,
      focusSecond: true
    })
  }

  onNextPress = () => {
    this.setState({
      isProcessing: true
    })
    if (!this.props.passwordStatus) {
      // TODO Skip component
      this.setState({
        isProcessing: false
      })
      return
    }
    if (this.props.error !== '' || this.props.error2 !== '') {
      this.setState({
        isProcessing: false
      })
      return
    }
    if (
      this.props.password &&
      this.props.password !== this.props.confirmPassword
    ) {
      this.setState({
        isProcessing: false
      })
      this.props.checkTheConfirmPassword()
      return
    }
    this.props.changePassword(this.props.password)
  }
  renderHeader = (style: Object) => {
    if (this.props.showHeader) {
      return <HeaderConnector style={style.header} />
    }
    return null
  }
  renderInterior = (styles: Object) => {
    return (
      <View style={styles.innerView}>
        <PasswordStatusConnector style={styles.status} />
        <PasswordConnector
          style={styles.inputBox}
          autoFocus={this.state.focusFirst}
          label={s.strings.new_password}
          onFinish={this.onSetNextFocus}
        />
        <View style={{ height: scale(20) }} />
        <PasswordConfirmConnector
          style={styles.inputBox}
          label={s.strings.re_enter_new_password}
          isSelected={this.state.focusSecond}
          autoFocus={this.state.focusSecond}
          onFinish={this.onNextPress}
        />
        <View style={{ height: scale(40) }} />
        <Button
          onPress={this.onNextPress}
          downStyle={styles.nextButton.downStyle}
          downTextStyle={styles.nextButton.downTextStyle}
          upStyle={styles.nextButton.upStyle}
          upTextStyle={styles.nextButton.upTextStyle}
          label={s.strings.done}
          isThinking={this.state.isProcessing}
          doesThink
        />
      </View>
    )
  }

  renderMain = (styles: Object) => {
    if (this.state.focusSecond) {
      return (
        <KeyboardAvoidingView
          style={styles.pageContainer}
          contentContainerStyle={styles.pageContainer}
          behavior={'position'}
          keyboardVerticalOffset={-150}
        >
          {this.renderInterior(styles)}
        </KeyboardAvoidingView>
      )
    }
    return (
      <View style={styles.pageContainer}>{this.renderInterior(styles)}</View>
    )
  }

  renderModal = (style: Object) => {
    if (this.props.showModal) {
      return <ChangePasswordModalConnector style={style.modal.skip} />
    }
    return null
  }

  render () {
    const { NewAccountPasswordScreenStyle } = this.props.styles
    return (
      <View style={NewAccountPasswordScreenStyle.screen}>
        {this.renderHeader(NewAccountPasswordScreenStyle)}
        {this.renderMain(NewAccountPasswordScreenStyle)}
        {this.renderModal(NewAccountPasswordScreenStyle)}
      </View>
    )
  }
}
