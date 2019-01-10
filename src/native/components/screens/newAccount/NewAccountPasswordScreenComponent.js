// @flow

import React, { Component } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import * as Constants from '../../../../common/constants'
import s from '../../../../common/locales/strings'
import PasswordStatusConnector from '../../../connectors/abSpecific/PasswordStatusConnector'
import SkipModalConnector from '../../../connectors/abSpecific/SkipModalConnector'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector'
import PasswordConfirmConnector from '../../../connectors/componentConnectors/PasswordConfirmConnector'
import PasswordConnector from '../../../connectors/componentConnectors/PasswordConnector.js'
import { Button } from '../../common'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type Props = {
  styles: Object,
  confirmPasswordErrorMessage: string,
  passwordStatus: Object,
  password: string,
  confirmPassword: string,
  workflow: Object,
  error: string,
  error2: string,
  checkTheConfirmPassword(): void,
  nextScreen(): void
}

type State = {
  isProcessing: boolean,
  focusFirst: boolean,
  focusSecond: boolean
}

export default class NewAccountPasswordScreenComponent extends Component<
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
  render () {
    const { NewAccountPasswordScreenStyle } = this.props.styles
    return (
      <SafeAreaView>
        <KeyboardAwareScrollView
          style={NewAccountPasswordScreenStyle.screen}
          keyboardShouldPersistTaps={Constants.ALWAYS}
          contentContainerStyle={NewAccountPasswordScreenStyle.mainScrollView}
        >
          <HeaderConnector style={NewAccountPasswordScreenStyle.header} />
          {this.renderMain(NewAccountPasswordScreenStyle)}
          {this.renderModal(NewAccountPasswordScreenStyle)}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
  renderMain (styles: Object) {
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
  renderInterior (styles: Object) {
    return (
      <View style={styles.innerView}>
        <PasswordStatusConnector style={styles.status} />
        <PasswordConnector
          label={s.strings.password}
          style={styles.inputBox}
          autoFocus={this.state.focusFirst}
          onFinish={this.onSetNextFocus}
        />
        <PasswordConfirmConnector
          style={styles.inputBox}
          autoFocus={this.state.focusSecond}
          onFinish={this.onNextPress}
        />
        <View style={styles.passwordShim} />
        <Button
          onPress={this.onNextPress}
          downStyle={styles.nextButton.downStyle}
          downTextStyle={styles.nextButton.downTextStyle}
          upStyle={styles.nextButton.upStyle}
          upTextStyle={styles.nextButton.upTextStyle}
          label={s.strings.next_label}
          isThinking={this.state.isProcessing}
          doesThink
        />
      </View>
    )
  }
  renderModal (style: Object) {
    if (this.props.workflow.showModal) {
      return <SkipModalConnector />
    }
    return null
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
      global.firebase &&
        global.firebase.analytics().logEvent(`Signup_Password_Invalid`)
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
      global.firebase &&
        global.firebase.analytics().logEvent(`Signup_Password_Invalid`)
      return
    }
    global.firebase &&
      global.firebase.analytics().logEvent(`Signup_Password_Valid`)
    this.props.nextScreen()
  }
}
