import React, { Component } from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import { Button, CustomModal } from '../../common'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderConnectorChangeApps'
import PasswordConnector
  from '../../../connectors/componentConnectors/PasswordConnector.js'
import PasswordConfirmConnector
  from '../../../connectors/componentConnectors/PasswordConfirmConnector'
import ChangePasswordModalConnector
  from '../../../connectors/abSpecific/ChangePasswordModalConnector'

/* type Props = {
  styles: any,
  confirmPasswordErrorMessage: string,
  passwordStatus: any,
  password: string,
  confirmPassword: string
} */

export default class ChangeAccountPasswordScreenComponent extends Component {
  componentWillMount () {
    this.setState({
      isProcessing: false,
      focusFirst: true,
      focusSecond: false
    })
  }
  renderHeader (style) {
    if (this.props.showHeader) {
      return <HeaderConnector style={style.header} />
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
  renderMain (styles) {
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
      <View style={styles.pageContainer}>
        {this.renderInterior(styles)}
      </View>
    )
  }
  renderInterior (styles) {
    return (
      <View style={styles.innerView}>
        <PasswordConnector
          style={styles.inputBox}
          autoFocus={this.state.focusFirst}
          label={'New Password'}
          onFinish={this.onSetNextFocus.bind(this)}
        />
        <View style={styles.inputShim} />
        <PasswordConfirmConnector
          style={styles.inputBox}
          label={'Re-enter New Password'}
          autoFocus={this.state.focusSecond}
          onFinish={this.onNextPress.bind(this)}
        />
        <View style={styles.inputShim} />
        <Button
          onPress={this.onNextPress.bind(this)}
          downStyle={styles.nextButton.downStyle}
          downTextStyle={styles.nextButton.downTextStyle}
          upStyle={styles.nextButton.upStyle}
          upTextStyle={styles.nextButton.upTextStyle}
          label={'DONE'}
          isThinking={this.state.isProcessing}
          doesThink
        />
      </View>
    )
  }
  renderModal (style) {
    if (this.props.workflow.showModal) {
      return (
        <CustomModal style={style.modal}>
          <ChangePasswordModalConnector style={style.modal.skip} />
        </CustomModal>
      )
    }
    return null
  }
  onSetNextFocus () {
    this.setState({
      focusFirst: false,
      focusSecond: true
    })
  }
  onNextPress () {
    this.setState({
      isProcessing: true
    })
    this.props.changePassword(this.props.password)

    /* if (!this.props.passwordStatus) {
      // TODO Skip component
      this.setState({
        isProcessing: false
      })
      return
    }
    if (this.props.createPasswordErrorMessage) {
      console.log('Error ' + this.props.createPasswordErrorMessage)
      this.setState({
        isProcessing: false
      })
      return
    }
    console.log(this.props.createPasswordErrorMessage)
    this.props.nextScreen() */
  }
}
