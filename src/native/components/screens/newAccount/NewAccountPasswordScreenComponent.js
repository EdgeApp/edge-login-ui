import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { Button, Modal } from '../../common'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderConnector'
import PasswordConnector
  from '../../../connectors/componentConnectors/PasswordConnector.js'
import PasswordConfirmConnector
  from '../../../connectors/componentConnectors/PasswordConfirmConnector'
import PasswordStatusConnector
  from '../../../connectors/abSpecific/PasswordStatusConnector'
export default class LandingScreenComponent extends Component {
  componentWillMount () {
    this.setState({
      isProcessing: false
    })
  }
  render () {
    const { NewAccountPasswordScreenStyle } = this.props.styles
    return (
      <View style={NewAccountPasswordScreenStyle.screen}>
        <HeaderConnector style={NewAccountPasswordScreenStyle.header} />
        <View style={NewAccountPasswordScreenStyle.pageContainer}>
          <PasswordStatusConnector
            style={NewAccountPasswordScreenStyle.status}
          />
          <PasswordConnector style={NewAccountPasswordScreenStyle.inputBox} />
          <PasswordConfirmConnector
            style={NewAccountPasswordScreenStyle.inputBox}
          />
          <Button
            onPress={this.onNextPress.bind(this)}
            downStyle={NewAccountPasswordScreenStyle.nextButton.downStyle}
            downTextStyle={
              NewAccountPasswordScreenStyle.nextButton.downTextStyle
            }
            upStyle={NewAccountPasswordScreenStyle.nextButton.upStyle}
            upTextStyle={NewAccountPasswordScreenStyle.nextButton.upTextStyle}
            label={'NEXT'}
            isThinking={this.state.isProcessing}
            doesThink
          />
        </View>
        {this.renderModal(NewAccountPasswordScreenStyle)}
      </View>
    )
  }
  renderModal (style) {
    if (this.props.workflow.showModal) {
      return <Modal style={style.modal.container} />
    }
    return null
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

LandingScreenComponent.propTypes = {
  styles: PropTypes.object.isRequired,
  confirmPasswordErrorMessage: PropTypes.string,
  passwordStatus: PropTypes.object,
  password: PropTypes.string,
  confirmPassword: PropTypes.string
}
