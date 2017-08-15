import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { BackgroundImage, Button, FormField } from '../../components/common'
import LogoImage from '../common/LogoImage'
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
        <View style={LoginPasswordScreenStyle.featureBoxIconHeader}>
          <LogoImage style={LoginPasswordScreenStyle.logo} />
        </View>
        <View style={LoginPasswordScreenStyle.featureBoxBody}>
          <FormField
            style={LoginPasswordScreenStyle.input}
            onChangeText={this.updateUsername.bind(this)}
            value={this.state.username}
            label={'Username'}
          />
          <FormField
            style={LoginPasswordScreenStyle.input}
            onChangeText={this.updatePassword.bind(this)}
            value={this.state.password}
            label={'Password'}
            error={this.props.error}
            secureTextEntry
          />
          {this.renderButtons(LoginPasswordScreenStyle)}
        </View>

      </View>
    )
  }

  renderButtons (style) {
    return (
      <View style={style.buttonsBox}>
        <Button
          onPress={this.onForgotPassword.bind(this)}
          label={'Forgot Password'}
          downStyle={style.forgotButton.downStyle}
          downTextStyle={style.forgotButton.downTextStyle}
          upStyle={style.forgotButton.upStyle}
          upTextStyle={style.forgotButton.upTextStyle}
        />
        <Button
          onPress={this.onStartLogin.bind(this)}
          label={'Login'}
          downStyle={style.loginButton.downStyle}
          downTextStyle={style.loginButton.downTextStyle}
          upStyle={style.loginButton.upStyle}
          upTextStyle={style.loginButton.upTextStyle}
          isThinking={this.state.logginIn}
          doesThink
        />
        <Button
          onPress={this.onCreateAccount.bind(this)}
          label={'Create an account'}
          downStyle={style.signupButton.downStyle}
          downTextStyle={style.signupButton.downTextStyle}
          upStyle={style.signupButton.upStyle}
          upTextStyle={style.signupButton.upTextStyle}
        />
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
  onForgotPassword () {
    this.props.onForgotPassword()
  }
  onStartLogin () {
    this.setState({
      loggingIn: true
    })
    this.props.userLogin({
      username: this.state.username,
      password: this.state.password
    })
  }
  onCreateAccount () {
    this.props.gotoCreatePage()
  }
}
