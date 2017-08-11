import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { Button } from '../../common'
import { PasswordHelper } from '../../../../common/dataHelpers/'
import PasswordConnector
  from '../../../connectors/componentConnectors/PasswordConnector.js'
import PasswordConfirmConnector
  from '../../../connectors/componentConnectors/PasswordConfirmConnector'
export default class LandingScreenComponent extends Component {
  componentWillMount () {
    this.setState({
      isProcessing: false
    })
  }
  render () {
    const { NewAccountUsernameScreenStyle } = this.props.styles
    return (
      <View style={NewAccountUsernameScreenStyle.screen}>
        <View style={NewAccountUsernameScreenStyle.header} />
        <View style={NewAccountUsernameScreenStyle.pageContainer}>
          <PasswordConnector style={NewAccountUsernameScreenStyle.inputBox} />
          <PasswordConfirmConnector
            style={NewAccountUsernameScreenStyle.inputBox}
          />
          <Button
            onPress={this.onNextPress.bind(this)}
            downStyle={NewAccountUsernameScreenStyle.nextButton.downStyle}
            downTextStyle={
              NewAccountUsernameScreenStyle.nextButton.downTextStyle
            }
            upStyle={NewAccountUsernameScreenStyle.nextButton.upStyle}
            upTextStyle={NewAccountUsernameScreenStyle.nextButton.upTextStyle}
            label={'NEXT'}
            isThinking={this.state.isProcessing}
            doesThink
          />
        </View>
      </View>
    )
  }
  onNextPress () {
    this.setState({
      isProcessing: true
    })
    if (!this.props.passwordStatus) {
      console.log('No Password Status Skip ')
      // TODO Skip component
      this.setState({
        isProcessing: false
      })
      return
    }
    if (this.props.confirmPasswordErrorMessage) {
      console.log('Confirm Error message ')
      this.setState({
        isProcessing: false
      })
      return
    }
    /* if (!this.props.password && !this.props.confirmPassword) {
      console.log('Confirm Error message ')
      this.setState({
        isProcessing: false
      })
      return
    } */
    const data = new PasswordHelper(this.props.passwordStatus)
    if (data.passed) {
      console.log('GOOD TO GO ON PASSWORD ')
      this.props.nextScreen()
      return
    }
    console.log('HMMM.... Problem z ')
    this.setState({
      isProcessing: false
    })
  }
}

LandingScreenComponent.propTypes = {
  styles: PropTypes.object.isRequired,
  confirmPasswordErrorMessage: PropTypes.string,
  passwordStatus: PropTypes.object,
  password: PropTypes.string,
  confirmPassword: PropTypes.string
}
