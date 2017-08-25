import React, { Component, PropTypes } from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import { Button, CustomModal } from '../../common'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderConnector'
import PasswordConnector
  from '../../../connectors/componentConnectors/PasswordConnector.js'
import PasswordConfirmConnector
  from '../../../connectors/componentConnectors/PasswordConfirmConnector'
import PasswordStatusConnector
  from '../../../connectors/abSpecific/PasswordStatusConnector'
import SkipModalConnector from '../../../connectors/abSpecific/SkipModalConnector'
export default class NewAccountPasswordScreenComponent extends Component {
  componentWillMount () {
    this.setState({
      isProcessing: false,
      focusFirst: true,
      focusSecond: false
    })
  }
  render () {
    const { NewAccountPasswordScreenStyle } = this.props.styles
    return (
      <View style={NewAccountPasswordScreenStyle.screen}>
        <HeaderConnector style={NewAccountPasswordScreenStyle.header} />
        {this.renderMain(NewAccountPasswordScreenStyle)}
        {this.renderModal(NewAccountPasswordScreenStyle)}
      </View>
    )
  }
  renderMain (styles) {
    console.log('THIS IS THE STATE ' + this.state.focusSecond)
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
        <PasswordStatusConnector style={styles.status} />
        <PasswordConnector
          style={styles.inputBox}
          autoFocus={this.state.focusFirst}
          onFinish={this.onSetNextFocus.bind(this)}
        />
        <View style={styles.inputShim} />
        <PasswordConfirmConnector
          style={styles.inputBox}
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
          label={'NEXT'}
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
          <SkipModalConnector style={style.modal.skip} />
        </CustomModal>
      )
    }
    return null
  }
  onSetNextFocus () {
    console.log('CHANGING THE FOCUS')
    this.setState({
      focusFirst: false,
      focusSecond: true
    })
  }
  onNextPress () {
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
    if (this.props.createPasswordErrorMessage) {
      console.log('Error ' + this.props.createPasswordErrorMessage)
      this.setState({
        isProcessing: false
      })
      return
    }
    console.log(this.props.createPasswordErrorMessage)
    this.props.nextScreen()
  }
}

NewAccountPasswordScreenComponent.propTypes = {
  styles: PropTypes.object.isRequired,
  confirmPasswordErrorMessage: PropTypes.string,
  passwordStatus: PropTypes.object,
  password: PropTypes.string,
  confirmPassword: PropTypes.string
}
