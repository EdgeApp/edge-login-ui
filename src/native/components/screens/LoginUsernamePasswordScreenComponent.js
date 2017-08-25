import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Keyboard } from 'react-native'
import { BackgroundImage, Button, FormField } from '../../components/common'
import { LogoImageHeader } from '../abSpecific'
// import * as Constants from '../../../common/constants'
import * as Assets from '../../assets/'

export default class LandingScreenComponent extends Component {
  componentWillMount () {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.noFocus.bind(this)
    )
    this.setState({
      username: '',
      password: '',
      loggingIn: false,
      focusFirst: true,
      focusSecond: false,
      offset: -110
    })
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove()
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.error && this.state.loggingIn) {
      this.setState({
        loggingIn: false
      })
    }
  }
  render () {
    const { LoginPasswordScreenStyle } = this.props.styles
    console.log('RENDER')
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
      <KeyboardAvoidingView
        style={LoginPasswordScreenStyle.featureBox}
        contentContainerStyle={LoginPasswordScreenStyle.keyboardAvoidContainer}
        behavior={'position'}
        keyboardVerticalOffset={this.state.offset}
      >
        {this.renderInterior(LoginPasswordScreenStyle)}
      </KeyboardAvoidingView>
    )
  }
  renderInterior (styles) {
    return (
      <View style={styles.innerView}>
        <LogoImageHeader style={styles.logoHeader} />
        <View style={styles.featureBoxBody}>

          <FormField
            style={styles.input}
            onChangeText={this.updateUsername.bind(this)}
            value={this.state.username}
            label={'Username'}
            returnKeyType={'next'}
            autoFocus={this.state.focusFirst}
            forceFocus={this.state.focusFirst}
            onFocus={this.onfocusOne.bind(this)}
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
            forceFocus={this.state.focusSecond}
            onFocus={this.onfocusTwo.bind(this)}
            onFinish={this.onStartLogin.bind(this)}
          />
          {this.renderButtons(styles)}
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
  onfocusOne () {
    this.setState({
      focusFirst: true,
      focusSecond: false,
      offset: -110
    })
  }
  onfocusTwo () {
    this.setState({
      focusFirst: false,
      focusSecond: true,
      offset: -80
    })
  }
  noFocus () {
    console.log('WE BLURRED KEYBOARD ')
    this.setState({
      focusFirst: false,
      focusSecond: false,
      offset: 0
    })
  }
  onSetNextFocus () {
    console.log('WE GOT THE SECOND CALL ' + this.state.offset)
    this.setState({
      focusFirst: false,
      focusSecond: true,
      offset: -80
    })
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
