import React, { Component } from 'react'
import { View, Keyboard, TouchableWithoutFeedback, Text } from 'react-native'
import {
  BackgroundImage,
  Button,
  FormField,
  FormFieldWithDropComponent,
  StaticModal
} from '../../components/common'
/* import UsernameDropConnector
  from '../../connectors/componentConnectors/UsernameDropConnector' */
import { LogoImageHeader, UserListItem } from '../abSpecific'
import * as Constants from '../../../common/constants'
import * as Assets from '../../assets/'
import * as Offsets from '../../constants'
import DeleteUserConnector
  from '../../../native/connectors/abSpecific/DeleteUserConnector'
import ForgotPasswordModalConnector
  from '../../../native/connectors/abSpecific/ForgotPasswordModalConnector'
import { localize, KEYS } from '../../../common/locale'

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
      if (this.state.showRecoveryModal) {
        const middle = <View style={this.style.modalMiddle}>
          <Text style={this.style.staticModalText}>
            Please enter the username of the account you want to recover.
          </Text>
          <FormField
            testID={'passwordFormField'}
            style={this.style.inputModal}
            onChangeText={this.updateUsername.bind(this)}
            value={this.props.username}
            label={'Ueername'}
            error={this.props.error}
            returnKeyType={'go'}
            forceFocus
            onSubmitEditing={this.recoverPasswordLogin}
          />
        </View>

        return (
          <ForgotPasswordModalConnector
            modalMiddleComponent={middle}
            cancel={this.cancelForgotPassword}
            action={this.recoverPasswordLogin}
          />
        )
      }
      if (this.props.recoveryLoginEnabledError) {
        const body = <Text style={style.staticModalText}>Recovery was not setup or was done on another device. If recovery was setup you should have emailed yourself a recovery token with a link. \nPlease find the email and click on the link using this device initiate recovery.</Text>
        return <StaticModal
          cancel={this.props.dismissRecoveryError}
          body={body}
          modalDismissTimerSeconds={5} />
      }
      return null
    }
    this.recoverPasswordLogin = () => {
      this.setState({
        showRecoveryModal: false
      })
      this.props.recoverPasswordLogin()
    }
    this.cancelForgotPassword = () => {
      this.setState({
        showRecoveryModal: false
      })
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
      offset: Offsets.USERNAME_OFFSET_LOGIN_SCREEN,
      showRecoveryModal: false
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
            value={this.props.password}
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
    this.props.updatePassword(data)
  }
  onForgotPassword () {
    // this.props.onForgotPassword()
    this.setState({
      showRecoveryModal: true
    })
  }
  onStartLogin () {
    this.noFocus()
    Keyboard.dismiss()
    this.setState({
      loggingIn: true
    })
    this.props.userLogin({
      username: this.props.username,
      password: this.props.password
    })
  }
  onCreateAccount () {
    this.props.gotoCreatePage()
  }
}
