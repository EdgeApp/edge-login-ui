import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import {
  BackgroundImage,
  Button,
  FormField,
  CustomModal
} from '../../components/common'
import UsernameDropConnector
  from '../../connectors/componentConnectors/UsernameDropConnector'
import { LogoImageHeader, UserListItem } from '../abSpecific'
import * as Constants from '../../../common/constants'
import * as Assets from '../../assets/'
import * as Offsets from '../../constants'
import DeleteUserConnector
  from '../../../native/connectors/abSpecific/DeleteUserConnector'
import { localize, KEYS } from '../../../common/locale'
// import PasswordConnector from '../../connectors/componentConnectors/PasswordConnector'
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view'

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
  componentDidMount () {
    if (this.props.previousUsers.lastUser) {
      this.props.launchUserLoginWithTouchId({username: this.props.previousUsers.lastUser.username})
    }
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
    return (
      <KeyboardAwareScrollView
        style={LoginPasswordScreenStyle.container}
        keyboardShouldPersistTaps={Constants.ALWAYS}
        contentContainerStyle={LoginPasswordScreenStyle.mainScrollView}
      >
        <BackgroundImage
          src={Assets.LOGIN_BACKGROUND}
          style={LoginPasswordScreenStyle.backgroundImage}
          content={this.renderOverImage()}
        />
      </KeyboardAwareScrollView>
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
      <View style={LoginPasswordScreenStyle.featureBox} >
        {this.renderInterior(LoginPasswordScreenStyle)}
        {this.renderModal(LoginPasswordScreenStyle)}
      </View>
    )
  }
  renderInterior (styles) {
    return (
      <View style={styles.innerView}>
        <LogoImageHeader style={styles.logoHeader} />
        <View style={styles.featureBoxBody}>
          {this.renderButtons(styles)}
          <FormField
            style={styles.input2}
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
          {/* <PasswordConnector
            onChangeText={this.updatePassword.bind(this)}
            value={this.state.password}
            label={'Password'}
            style={styles.input2}
          /> */}
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
          value={this.props.username}
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
      <UsernameDropConnector
        style={styles.inputWithDrop}
        onChangeText={this.updateUsername.bind(this)}
        autoFocus={this.state.focusFirst}
        forceFocus={this.state.focusFirst}
        onFocus={this.onfocusOne.bind(this)}
        onFinish={this.onSetNextFocus.bind(this)}
        getListItemsFunction={this.renderItems.bind(this)}
        dataList={this.props.usernameList}
      />
    )
  }
  renderItems (style, dataList) {
    return dataList.map(Item => (
      <UserListItem
        key={'key ' + Item}
        data={Item}
        style={style}
        onClick={this.selectUser.bind(this)}
        onDelete={this.onDelete.bind(this)}
      />
    ))
  }
  onDelete (user) {
    // console.log('DELETE THIS USER ' + user)
    // this.props.deleteUserFromDevice(user)
    this.setState({
      username: user
    })
    this.props.launchDeleteModal()
  }
  renderButtons (style) {
    console.log(style)
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
          label={localize(KEYS.BUTTONS.LOGIN)}
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
  renderModal (style) {
    if (this.props.showModal) {
      return (
        <CustomModal style={style.modal}>
          <DeleteUserConnector
            style={style.modal.skip}
            username={this.state.username}
          />
        </CustomModal>
      )
    }
    return null
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
    this.setState({
      focusFirst: false,
      focusSecond: false,
      offset: Offsets.LOGIN_SCREEN_NO_OFFSET
    })
  }
  onSetNextFocus () {
    this.setState({
      focusFirst: false,
      focusSecond: true,
      offset: Offsets.PASSWORD_OFFSET_LOGIN_SCREEN
    })
  }
  selectUser (user) {
    this.updateUsername(user)
    if (this.checkPinEnabled(user)) {
      this.props.gotoPinLoginPage()
      return
    }
    this.props.launchUserLoginWithTouchId({username: user})
    this.onSetNextFocus()
  }

  checkPinEnabled (user) {
    for (let i = 0; i < this.props.previousUsers.length; i++) {
      let obj = this.props.previousUsers[i]
      if (user === obj.username && obj.pinEnabled) {
        return true
      }
    }
    return false
  }
  updateUsername (data) {
    this.props.updateUsername(data)
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
    this.noFocus()
    Keyboard.dismiss()
    this.setState({
      loggingIn: true
    })
    this.props.userLogin({
      username: this.props.username,
      password: this.state.password
    })
  }
  onCreateAccount () {
    this.props.gotoCreatePage()
  }
}
