import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { BackgroundImage, Button, FormField } from '../../components/common'
import { LogoImageHeader } from '../abSpecific'
// import * as Constants from '../../../common/constants'
import * as Assets from '../../assets/'

export default class LandingScreenComponent extends Component {
  componentWillMount () {
    this.setState({
      username: '',
      password: '',
      loggingIn: false,
      focusFirst: true,
      focusSecond: false
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.error && this.state.loggingIn) {
      this.setState({
        loggingIn: false
      })
    }
  }
  onSetNextFocus () {
    this.setState({
      focusFirst: false,
      focusSecond: true
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
        <LogoImageHeader style={LoginPasswordScreenStyle.logoHeader} />
        {this.renderMain(LoginPasswordScreenStyle)}
      </View>
    )
  }
  renderMain (styles) {
    if (this.state.focusSecond) {
      return (
        <KeyboardAvoidingView
          style={styles.featureBoxBody}
          contentContainerStyle={styles.featureBoxBody}
          behavior={'position'}
          keyboardVerticalOffset={-80}
        >
          {this.renderInterior(styles)}
        </KeyboardAvoidingView>
      )
    }
    return (
      <View style={styles.featureBoxBody}>
        {this.renderInterior(styles)}
      </View>
    )
  }
  renderInterior (styles) {
    return (
      <View style={styles.innerView}>
        <FormField
          style={styles.input}
          onChangeText={this.updateUsername.bind(this)}
          value={this.state.username}
          label={'Username'}
          returnKeyType={'next'}
          autoFocus={this.state.focusFirst}
          onFinish={this.onSetNextFocus.bind(this)}
        />
        <FormField
          style={styles.input}
          onChangeText={this.updatePassword.bind(this)}
          value={this.state.password}
          label={'Password'}
          error={this.props.error}
          secureTextEntry
          returnKeyType={'go'}
          autoFocus={this.state.focusSecond}
          onFinish={this.onStartLogin.bind(this)}
        />
        {this.renderButtons(styles)}
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
          isThinking={this.state.loggingIn}
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
