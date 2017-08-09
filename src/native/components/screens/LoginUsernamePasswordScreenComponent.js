import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { BackgroundImage, Button, Input } from '../../components/common'
// import * as Constants from '../../../common/constants'
import * as Assets from '../../assets/'

export default class LandingScreenComponent extends Component {
  componentWillMount () {
    this.setState({
      username: '',
      password: '',
      loggingIn: false
    })
  }
  render () {
    const { LoginPasswordScreenStyle } = this.props.styles
    return (
      <View style={LoginPasswordScreenStyle.container}>
        <BackgroundImage
          src={Assets.LOGIN_BACKGROUND}
          style={LoginPasswordScreenStyle.backgroundImage}
        >
          {this.renderOverImage()}
        </BackgroundImage>
      </View>
    )
  }

  renderOverImage () {
    const { LoginPasswordScreenStyle } = this.props.styles
    if (this.props.loginSuccess) {
      return (
        <View style={LoginPasswordScreenStyle.featureBox}>
          <Text>LOGIN SUCCESS</Text>
        </View>
      )
    }
    return (
      <View style={LoginPasswordScreenStyle.featureBox}>
        <View style={LoginPasswordScreenStyle.featureBoxIconHeader} />
        <View style={LoginPasswordScreenStyle.featureBoxBody}>
          <Input
            style={LoginPasswordScreenStyle.inputBoxes}
            onChangeText={this.updateUsername.bind(this)}
            value={this.state.username}
          />
          <Input
            style={LoginPasswordScreenStyle.inputBoxes}
            onChangeText={this.updatePassword.bind(this)}
            value={this.state.password}
            placeholder={'BLOB'}
            secureTextEntry
          />
          <Button
            onPress={this.onStartCreate.bind(this)}
            label={'Forgot Password'}
            downStyle={LoginPasswordScreenStyle.forgotButton.downStyle}
            downTextStyle={LoginPasswordScreenStyle.forgotButton.downTextStyle}
            upStyle={LoginPasswordScreenStyle.forgotButton.upStyle}
            upTextStyle={LoginPasswordScreenStyle.forgotButton.upTextStyle}
          />
          <Button
            onPress={this.onStartLogin.bind(this)}
            label={'Login'}
            downStyle={LoginPasswordScreenStyle.loginButton.downStyle}
            downTextStyle={LoginPasswordScreenStyle.loginButton.downTextStyle}
            upStyle={LoginPasswordScreenStyle.loginButton.upStyle}
            upTextStyle={LoginPasswordScreenStyle.loginButton.upTextStyle}
            isThinking={this.state.logginIn}
            doesThink
          />
          <Button
            onPress={this.onCreateAccount.bind(this)}
            label={'Create an account'}
            downStyle={LoginPasswordScreenStyle.signupButton.downStyle}
            downTextStyle={LoginPasswordScreenStyle.signupButton.downTextStyle}
            upStyle={LoginPasswordScreenStyle.signupButton.upStyle}
            upTextStyle={LoginPasswordScreenStyle.signupButton.upTextStyle}
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
  onStartCreate () {
    // this.props.userLogin({ username: 'Bob20', password: 'Bob20' })
  }
  onStartLogin () {
    this.setState({
      loggingIn: true
    })
    /* this.props.userLogin({
      username: this.state.username,
      password: this.state.password
    }) */
  }
  onCreateAccount () {
    // this.props.userLogin({ username: 'Bob20', password: 'Bob20' })
  }
}
