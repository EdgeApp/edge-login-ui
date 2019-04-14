// @flow

import React, { Component } from 'react'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import DeleteUserConnector from '../../../native/connectors/abSpecific/DeleteUserConnector'
import * as Assets from '../../assets/'
import {
  BackgroundImage,
  Button,
  DropDownList,
  FormField,
  FormFieldWithDropComponent,
  StaticModal
} from '../../components/common'
import * as Offsets from '../../constants'
import { LogoImageHeader, UserListItem } from '../abSpecific'
import { HeaderParentButtons, IconButton } from '../common'

type Props = {
  styles: Object,
  username: string,
  password: string,
  previousUsers: Object,
  filteredUsernameList: Array<string>,
  error: string,
  gotoCreatePage(): void,
  updateUsername(string): void,
  updatePassword(string): void,
  userLogin(Object): void,
  launchUserLoginWithTouchId(Object): void,
  gotoPinLoginPage(): void,
  launchDeleteModal(): void,
  recoverPasswordLogin(): void,
  appId?: string,
  backgroundImage?: any,
  primaryLogo?: any,
  parentButton?: Object
}

type State = {
  username: string,
  password: string,
  loggingIn: boolean,
  focusFirst: boolean,
  focusSecond: boolean,
  offset: number,
  showRecoveryModalOne: boolean,
  showRecoveryModalTwo: boolean,
  usernameList: boolean
}

export default class LoginUsernamePasswordScreenComponent extends Component<
  Props,
  State
> {
  keyboardDidHideListener: ?Function
  style: Object

  constructor (props: Props) {
    super(props)
    const { LoginPasswordScreenStyle } = this.props.styles
    this.style = LoginPasswordScreenStyle
    this.keyboardDidHideListener = null
    setTimeout(this.setListener, 2000, this.noFocus)
    this.state = {
      username: '',
      password: '',
      loggingIn: false,
      focusFirst: true,
      focusSecond: false,
      offset: Offsets.USERNAME_OFFSET_LOGIN_SCREEN,
      showRecoveryModalOne: false,
      showRecoveryModalTwo: false,
      usernameList: false
    }
  }
  renderModal = (style: Object) => {
    if (this.props.showModal) {
      return (
        <DeleteUserConnector
          style={style.modal.skip}
          username={this.state.username}
        />
      )
    }
    if (this.state.showRecoveryModalOne) {
      const body = (
        <Text style={style.staticModalText}>
          {s.strings.initiate_password_recovery}
        </Text>
      )
      return (
        <StaticModal
          cancel={this.closeForgotPasswordModal}
          body={body}
          modalDismissTimerSeconds={8}
        />
      )
    }
    return null
  }
  recoverPasswordLogin = () => {
    this.setState({
      showRecoveryModalOne: false
    })
    this.props.recoverPasswordLogin()
  }
  cancelForgotPassword = () => {
    this.setState({
      showRecoveryModalOne: false
    })
  }

  noFocus = () => {
    Keyboard.dismiss()
    this.setState({
      focusFirst: false,
      focusSecond: false,
      offset: Offsets.LOGIN_SCREEN_NO_OFFSET
    })
  }
  onDelete = (user: string) => {
    //
    // this.props.deleteUserFromDevice(user) TODO
    this.setState({
      username: user
    })
    this.props.launchDeleteModal()
  }
  setListener (callback: Function) {
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
  componentWillReceiveProps (nextProps: Props) {
    if (
      (nextProps.error && this.state.loggingIn) ||
      (this.state.loggingIn && nextProps.loginSuccess)
    ) {
      this.setState({
        loggingIn: false
      })
    }
  }
  shouldComponentUpdate (nextProps: Props) {
    if (
      nextProps.username !== this.props.username &&
      this.state.showRecoveryModalOne
    ) {
      return false
    }
    // return a boolean value
    return true
  }
  render () {
    return (
      <KeyboardAwareScrollView
        style={this.style.container}
        keyboardShouldPersistTaps={Constants.ALWAYS}
        contentContainerStyle={this.style.mainScrollView}
      >
        <BackgroundImage
          src={this.props.backgroundImage || Assets.LOGIN_BACKGROUND}
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
      <View style={this.style.featureBoxContainer}>
        <HeaderParentButtons
          parentButton={this.props.parentButton}
          styles={this.props.styles.HeaderParentButtons}
          appId={this.props.appId}
        />
        <TouchableWithoutFeedback onPress={this.noFocus}>
          <View style={this.style.featureBox}>
            <LogoImageHeader
              style={this.style.logoHeader}
              src={this.props.primaryLogo}
            />
            {this.renderUsername(this.style)}
            <View style={this.style.shimTiny} />
            <FormField
              testID={'passwordFormField'}
              style={this.style.input2}
              onChangeText={this.updatePassword.bind(this)}
              value={this.props.password}
              label={s.strings.password}
              error={this.props.error}
              autoCorrect={false}
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
      </View>
    )
  }
  renderUsername (styles: Object) {
    return (
      <View>
        <View style={styles.usernameWrapper}>
          <FormField
            testID={'usernameFormField'}
            style={styles.input2}
            onChangeText={this.updateUsername.bind(this)}
            value={this.props.username}
            label={s.strings.username}
            returnKeyType={'next'}
            autoCorrect={false}
            autoFocus={this.state.focusFirst}
            forceFocus={this.state.focusFirst}
            onFocus={this.onfocusOne.bind(this)}
            onSubmitEditing={this.onSetNextFocus.bind(this)}
          />
          <IconButton
            style={this.style.iconButton}
            icon={
              this.state.usernameList
                ? Constants.EXPAND_LESS
                : Constants.EXPAND_MORE
            }
            iconType={Constants.MATERIAL_ICONS}
            onPress={this.toggleUsernameList.bind(this)}
          />
        </View>
        {this.state.usernameList && this.renderDropdownList()}
      </View>
    )
  }

  renderDropdownList () {
    return (
      <DropDownList
        style={this.style.dropDownList}
        data={this.props.filteredUsernameList}
        renderRow={this.renderRow.bind(this)}
      />
    )
  }

  renderRow (data: Object) {
    return (
      <UserListItem
        data={data.item}
        style={this.style.inputWithDrop.listItem}
        onClick={this.selectUser.bind(this)}
        onDelete={this.onDelete.bind(this)}
      />
    )
  }

  renderButtons (style: Object) {
    return (
      <View style={style.buttonsBox}>
        <View style={style.shimTiny} />
        <Button
          onPress={this.onForgotPassword.bind(this)}
          label={s.strings.forgot_password}
          downStyle={style.forgotButton.downStyle}
          downTextStyle={style.forgotButton.downTextStyle}
          upStyle={style.forgotButton.upStyle}
          upTextStyle={style.forgotButton.upTextStyle}
        />
        <View style={style.shimTiny} />
        <Button
          testID={'loginButton'}
          onPress={this.onStartLogin.bind(this)}
          label={s.strings.login_button}
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
          label={s.strings.create_an_account}
          downStyle={style.signupButton.downStyle}
          downTextStyle={style.signupButton.downTextStyle}
          upStyle={style.signupButton.upStyle}
          upTextStyle={style.signupButton.upTextStyle}
        />
      </View>
    )
  }
  toggleUsernameList () {
    Keyboard.dismiss()
    this.setState({
      focusFirst: false,
      focusSecond: false,
      usernameList: !this.state.usernameList
    })
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
  selectUser (user: string) {
    this.updateUsername(user)
    this.setState({
      usernameList: false
    })
    if (this.checkPinEnabled(user)) {
      this.props.gotoPinLoginPage()
      return
    }
    this.props.launchUserLoginWithTouchId({ username: user })
    this.onSetNextFocus()
  }

  checkPinEnabled (user: string) {
    for (let i = 0; i < this.props.previousUsers.length; i++) {
      const obj = this.props.previousUsers[i]
      if (user === obj.username && obj.pinEnabled) {
        return true
      }
    }
    return false
  }
  updateUsername (data: string) {
    this.props.updateUsername(data)
  }
  updatePassword (data: string) {
    this.props.updatePassword(data)
  }
  onForgotPassword () {
    // this.props.onForgotPassword()
    this.setState({
      showRecoveryModalOne: true
    })
  }
  closeForgotPasswordModal = () => {
    // this.props.onForgotPassword()
    this.setState({
      showRecoveryModalOne: false
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
