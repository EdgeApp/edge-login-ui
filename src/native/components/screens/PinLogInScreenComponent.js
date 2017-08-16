import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { BackgroundImage, Button, DropInput } from '../../components/common'
import { LogoImageHeader } from '../../components/abSpecific'
import FourDigitInputConnector from '../../connectors/abSpecific/FourDigitInputConnector'
// import * as Constants from '../../../common/constants'
import * as Assets from '../../assets/'

export default class PinLogInScreenComponent extends Component {
  componentWillMount () {
    this.setState({
      username: '',
      pin: '',
      loggingIn: false
    })
  }
  render () {
    const { PinLoginScreenStyle } = this.props.styles
    return (
      <View style={PinLoginScreenStyle.container}>
        <BackgroundImage
          src={Assets.LOGIN_BACKGROUND}
          style={PinLoginScreenStyle.backgroundImage}
        >
          {this.renderOverImage()}
        </BackgroundImage>
      </View>
    )
  }

  renderOverImage () {
    const { PinLoginScreenStyle } = this.props.styles
    if (this.props.loginSuccess) {
      return (
        <View style={PinLoginScreenStyle.featureBox}>
          <Text>LOGIN SUCCESS</Text>
        </View>
      )
    }
    return (
      <View style={PinLoginScreenStyle.featureBox}>
        <LogoImageHeader style={PinLoginScreenStyle.logoHeader} />
        <View style={PinLoginScreenStyle.featureBoxBody}>
          <DropInput style={PinLoginScreenStyle.dropInput} />
          <FourDigitInputConnector style={PinLoginScreenStyle.fourPin} />
          <Button
            onPress={this.props.gotoLoginPage}
            label={'EXIT PIN'}
            downStyle={PinLoginScreenStyle.forgotButton.downStyle}
            downTextStyle={PinLoginScreenStyle.forgotButton.downTextStyle}
            upStyle={PinLoginScreenStyle.forgotButton.upStyle}
            upTextStyle={PinLoginScreenStyle.forgotButton.upTextStyle}
          />
        </View>

      </View>
    )
  }

  updateUsername (data) {
    this.setState({
      username: data
    })
  }
  updatePassword (data) {
    this.setState({
      password: data
    })
  }

  onStartLogin () {
    this.setState({
      loggingIn: true
    })
    this.props.userLogin({
      username: 'edgy26', // this.state.username,
      pin: '1111' // this.state.pin
    })
  }
  onCreateAccount () {
    // this.props.userLogin({ username: 'Bob20', password: 'Bob20' })
  }
}
