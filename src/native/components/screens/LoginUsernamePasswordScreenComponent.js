import React, { Component } from 'react'
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native'
import {
  BackgroundImage,
  Button,
  FormField,
  FormFieldWithDropComponent
} from '../../components/common'
/* import UsernameDropConnector
  from '../../connectors/componentConnectors/UsernameDropConnector' */
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
    const { LoginPasswordScreenStyle } = this.props.styles
    this.style = LoginPasswordScreenStyle
    this.keyboardDidHideListener = null
    this.renderModal = (style) => {
      if (this.props.showModal) {
        return (
          <DeleteUserConnector
            style={style.modal.skip}
            username={this.state.username}
          />
        )
      }
      return null
    }

    this.noFocus = () => {
      Keyboard.dismiss()
      this.setState({
        focusFirst: false,
        focusSecond: false,
        offset: Offsets.LOGIN_SCREEN_NO_OFFSET
      })
    }
    this.onDelete = (user) => {
      //
      // this.props.deleteUserFromDevice(user) TODO
      this.setState({
        username: user
      })
      this.props.launchDeleteModal()
    }
    setTimeout(this.setListener, 2000, this.noFocus)

    this.setState({
      username: '',
      password: '',
      loggingIn: false,
      focusFirst: true,
      focusSecond: false,
      offset: Offsets.USERNAME_OFFSET_LOGIN_SCREEN
    })
  }
  setListener (callback) {
    /* this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      callback) */
  }
  componentWillUnmount () {
    // this.keyboardDidHideListener.remove()
  }
  componentDidMount () {
    this.setState({
      username: '',
      password: '',
      loggingIn: false,
      focusFirst: true,
      focusSecond: false,
      offset: Offsets.USERNAME_OFFSET_LOGIN_SCREEN
    })
    if (this.props.previousUsers.lastUser) {
      this.props.launchUserLoginWithTouchId({
        username: this.props.previousUsers.lastUser.username
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    if ((nextProps.error && this.state.loggingIn) || (this.state.loggingIn && nextProps.loginSuccess)) {
      this.setState({
        loggingIn: false
      })
    }
    /* if (!this.keyboardDidHideListener) {
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this.noFocus.bind(this)
      )
    } */
  }
  render () {
    return (
      <KeyboardAwareScrollView
        style={this.style.container}
        keyboardShouldPersistTaps={Constants.ALWAYS}
        contentContainerStyle={this.style.mainScrollView}
      >
        <BackgroundImage
          src={Assets.LOGIN_BACKGROUND}
          style={this.style.backgroundImage}
          content={this.renderOverImage()}
          callback={this.noFocus}
        />
      </KeyboardAwareScrollView>
    )
  }
  renderOverImage () {
    if (this.props.loginSuccess) {
      /* return (
        <View style={style.featureBox}>
          <Text>LOGIN SUCCESS</Text>
        </View>
      ) */
      return null
    }
    return (
      <TouchableWithoutFeedback onPress={this.noFocus}>
        <View style={this.style.featureBox}>
          <LogoImageHeader style={this.style.logoHeader} />
          {this.renderUsername(this.style)}
          <View style={this.style.shimTiny} />
          <FormField
            testID={'passwordFormField'}
            style={this.style.input2}
            onChangeText={this.updatePassword.bind(this)}
            value={this.state.password}
            label={'Password'}
            error={this.props.error}
            secureTextEntry
            returnKeyType={'go'}
            forceFocus={this.state.focusSecond}
            onFocus={this.onfocusTwo.bind(this)}
            onSubmitEditing={this.onStartLogin.bind(this)}
          />
          {this.renderButtons(this.style)}
          {this.renderModal(this.style)}
        </View>
      </TouchableWithoutFeedback>
    )
  }
  renderUsername (styles) {
    if (this.props.previousUsers.length > 1) {
      return (
        <FormFieldWithDropComponent
          testID={'usernameFormField'}
          style={styles.inputWithDrop}
          onChangeText={this.updateUsername.bind(this)}
          value={this.props.username}
          label={'Username'}
          returnKeyType={'next'}
          autoFocus={this.state.focusFirst}
          forceFocus={this.state.focusFirst}
          onFocus={this.onfocusOne.bind(this)}
          isFocused={this.state.focusFirst}
          onSubmitEditing={this.onSetNextFocus.bind(this)}
          renderRow={this.renderRow.bind(this)}
          data={this.props.filteredUsernameList}
        />
      )
    }
    return (
      <FormField
        testID={'usernameFormField'}
        style={styles.input2}
        onChangeText={this.updateUsername.bind(this)}
        value={this.props.username}
        label={'Username'}
        returnKeyType={'next'}
        autoFocus={this.state.focusFirst}
        forceFocus={this.state.focusFirst}
        onFocus={this.onfocusOne.bind(this)}
        onSubmitEditing={this.onSetNextFocus.bind(this)}
      />
    )
  }
  renderRow (data) {
    return (
      <UserListItem
        data={data.item}
        style={this.style.inputWithDrop.listItem}
        onClick={this.selectUser.bind(this)}
        onDelete={this.onDelete.bind(this)}
      />
    )
  }

  renderButtons (style) {
    return (
      <View style={style.buttonsBox}>
        <View style={style.shimTiny} />
        <Button
          onPress={this.onForgotPassword.bind(this)}
          label={'Forgot Password'}
          downStyle={style.forgotButton.downStyle}
          downTextStyle={style.forgotButton.downTextStyle}
          upStyle={style.forgotButton.upStyle}
          upTextStyle={style.forgotButton.upTextStyle}
        />
        <View style={style.shimTiny} />
        <Button
          testID={'loginButton'}
          onPress={this.onStartLogin.bind(this)}
          label={localize(KEYS.BUTTONS.LOGIN)}
          downStyle={style.loginButton.downStyle}
          downTextStyle={style.loginButton.downTextStyle}
          upStyle={style.loginButton.upStyle}
          upTextStyle={style.loginButton.upTextStyle}
          isThinking={this.state.loggingIn}
          doesThink
        />
        <View style={style.shimTiny} />
        <Button
          testID={'createAccountButton'}
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
    this.props.launchUserLoginWithTouchId({ username: user })
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
