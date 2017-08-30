import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Keyboard } from 'react-native'
import {
  BackgroundImage,
  Button,
  FormField,
  FormFieldWithDropComponent
} from '../../components/common'
import { LogoImageHeader, UserListItem } from '../abSpecific'
// import * as Constants from '../../../common/constants'
import * as Assets from '../../assets/'
import * as Offsets from '../../constants'

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
      offset: Offsets.USERNAME_OFFSET_LOGIN_SCREEN
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
          enableTouch={false}
          content={this.renderOverImage()}
        />
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
          {this.renderButtons(styles)}
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
          {this.renderUsername(styles)}
        </View>
      </View>
    )
  }
  renderUsername (styles) {
    if (this.props.previousUsers.length < 1) {
      return (
        <FormField
          style={styles.inputWithDrop}
          onChangeText={this.updateUsername.bind(this)}
          value={this.state.username}
          label={'Username'}
          returnKeyType={'next'}
          autoFocus={this.state.focusFirst}
          forceFocus={this.state.focusFirst}
          onFocus={this.onfocusOne.bind(this)}
          onFinish={this.onSetNextFocus.bind(this)}
        />
      )
    }
    return (
      <FormFieldWithDropComponent
        style={styles.inputWithDrop}
        onChangeText={this.updateUsername.bind(this)}
        value={this.state.username}
        label={'Username'}
        returnKeyType={'next'}
        autoFocus={this.state.focusFirst}
        forceFocus={this.state.focusFirst}
        onFocus={this.onfocusOne.bind(this)}
        onFinish={this.onSetNextFocus.bind(this)}
        getListItemsFunction={this.renderItems.bind(this)}
        dataList={this.props.usernameList}
      />
    )
  }
  renderItems (item) {
    const { PinLoginScreenStyle } = this.props.styles
    return (
      <UserListItem
        key={'key ' + item}
        data={item}
        style={PinLoginScreenStyle.listItem}
        onClick={this.selectUser.bind(this)}
      />
    )
  }
  selectUser (user) {
    console.log('select user ')
    console.log(user)
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
      offset: this.props.hasUsers
        ? Offsets.USERNAME_OFFSET_LOGIN_SCREEN
        : Offsets.LOGIN_SCREEN_NO_OFFSET
    })
  }
  onfocusTwo () {
    this.setState({
      focusFirst: false,
      focusSecond: true,
      offset: Offsets.PASSWORD_OFFSET_LOGIN_SCREEN
    })
  }
  noFocus () {
    /* this.setState({
      focusFirst: false,
      focusSecond: false,
      offset: Offsets.LOGIN_SCREEN_NO_OFFSET
    }) */
  }
  onSetNextFocus () {
    this.setState({
      focusFirst: false,
      focusSecond: true,
      offset: Offsets.PASSWORD_OFFSET_LOGIN_SCREEN
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
