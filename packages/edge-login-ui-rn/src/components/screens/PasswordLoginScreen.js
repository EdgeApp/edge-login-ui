// @flow

import React, { Component } from 'react'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { sprintf } from 'sprintf-js'

import { userLogin } from '../../actions/LoginAction.js'
import { deleteUserFromDevice } from '../../actions/UserActions.js'
import * as Assets from '../../assets/'
import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'
import { type LoginUserInfo } from '../../reducers/PreviousUsersReducer.js'
import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { scale } from '../../util/scaling.js'
import { LogoImageHeader } from '../abSpecific/LogoImageHeader.js'
import { UserListItem } from '../abSpecific/UserListItem.js'
import { BackgroundImage } from '../common/BackgroundImage.js'
import { Button } from '../common/Button.js'
import { HeaderParentButtons } from '../common/HeaderParentButtons.js'
import { IconButton } from '../common/IconButton.js'
import { DropDownList, FormField } from '../common/index.js'
import { StaticModal } from '../common/StaticModal.js'
import { ButtonsModal } from '../modals/ButtonsModal.js'
import { Airship, showError } from '../services/AirshipInstance.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  appId?: string,
  backgroundImage?: any,
  primaryLogo?: any,
  primaryLogoCallback?: () => void,
  parentButton?: Object
}
type StateProps = {
  error: string,
  loginSuccess: boolean,
  password: string,
  previousUsers: LoginUserInfo[],
  touch: $PropertyType<RootState, 'touch'>,
  username: string,
  usernameOnlyList: string[]
}
type DispatchProps = {
  deleteUserFromDevice(username: string): Promise<void>,
  gotoCreatePage(): void,
  gotoPinLoginPage(): void,
  updatePassword(string): void,
  updateUsername(string): void,
  userLogin(Object): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  loggingIn: boolean,
  focusFirst: boolean,
  focusSecond: boolean,
  showRecoveryModalOne: boolean,
  usernameList: boolean
}

class PasswordLoginScreenComponent extends Component<Props, State> {
  style: Object

  constructor(props: Props) {
    super(props)
    this.style = LoginPasswordScreenStyle
    this.state = {
      loggingIn: false,
      focusFirst: true,
      focusSecond: false,
      showRecoveryModalOne: false,
      usernameList: false
    }
  }

  renderModal = (style: typeof LoginPasswordScreenStyle) => {
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

  cancelForgotPassword = () => {
    this.setState({
      showRecoveryModalOne: false
    })
  }

  noFocus = () => {
    Keyboard.dismiss()
    this.setState({
      focusFirst: false,
      focusSecond: false
    })
  }

  handleDelete = (username: string) => {
    const { deleteUserFromDevice } = this.props

    Airship.show(bridge => (
      <ButtonsModal
        bridge={bridge}
        title={s.strings.delete_account}
        message={sprintf(s.strings.delete_username_account, username)}
        buttons={{
          ok: { label: s.strings.delete },
          cancel: { label: s.strings.cancel, type: 'secondary' }
        }}
      />
    ))
      .then(button => {
        if (button !== 'ok') return
        return deleteUserFromDevice(username)
      })
      .catch(showError)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      (nextProps.error && this.state.loggingIn) ||
      (this.state.loggingIn && nextProps.loginSuccess)
    ) {
      this.setState({
        loggingIn: false
      })
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    if (
      nextProps.username !== this.props.username &&
      this.state.showRecoveryModalOne
    ) {
      return false
    }
    // return a boolean value
    return true
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={this.style.container}
        keyboardShouldPersistTaps="always"
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

  renderOverImage() {
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
          appId={this.props.appId}
        />
        <TouchableWithoutFeedback onPress={this.noFocus}>
          <View style={this.style.featureBox}>
            <LogoImageHeader
              style={this.style.logoHeader}
              src={this.props.primaryLogo}
              callback={this.props.primaryLogoCallback}
            />
            {this.renderUsername(this.style)}
            <View style={this.style.shimTiny} />
            <FormField
              testID="passwordFormField"
              style={this.style.input2}
              onChangeText={this.updatePassword.bind(this)}
              value={this.props.password}
              label={s.strings.password}
              error={this.props.error}
              autoCorrect={false}
              secureTextEntry
              returnKeyType="go"
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

  renderUsername(styles: typeof LoginPasswordScreenStyle) {
    return (
      <View>
        <View style={styles.usernameWrapper}>
          <FormField
            testID="usernameFormField"
            style={styles.input2}
            onChangeText={this.updateUsername.bind(this)}
            value={this.props.username}
            label={s.strings.username}
            returnKeyType="next"
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

  renderDropdownList() {
    return (
      <DropDownList
        style={this.style.dropDownList}
        data={this.props.usernameOnlyList}
        renderRow={this.renderRow.bind(this)}
      />
    )
  }

  renderRow(data: Object) {
    return (
      <UserListItem
        data={data.item}
        style={this.style.inputWithDrop.listItem}
        onClick={this.selectUser.bind(this)}
        onDelete={this.handleDelete}
      />
    )
  }

  renderButtons(style: typeof LoginPasswordScreenStyle) {
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
          testID="loginButton"
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
          testID="createAccountButton"
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

  toggleUsernameList() {
    Keyboard.dismiss()
    this.setState({
      focusFirst: false,
      focusSecond: false,
      usernameList: !this.state.usernameList
    })
  }

  onfocusOne() {
    this.setState({
      focusFirst: true,
      focusSecond: false
    })
  }

  onfocusTwo() {
    this.setState({
      focusFirst: false,
      focusSecond: true
    })
  }

  onSetNextFocus() {
    this.setState({
      focusFirst: false,
      focusSecond: true
    })
  }

  selectUser(username: string) {
    this.updateUsername(username)
    this.setState({
      usernameList: false
    })

    const details: LoginUserInfo | void = this.props.previousUsers.find(
      info => info.username === username
    )
    if (
      details != null &&
      (details.pinEnabled || (details.touchEnabled && this.props.touch))
    ) {
      this.props.gotoPinLoginPage()
      return
    }
    this.onSetNextFocus()
  }

  updateUsername(data: string) {
    this.props.updateUsername(data)
  }

  updatePassword(data: string) {
    this.props.updatePassword(data)
  }

  onForgotPassword() {
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

  onStartLogin() {
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

  onCreateAccount() {
    this.props.gotoCreatePage()
  }
}

const LoginPasswordScreenStyle = {
  container: Styles.ScreenStyle,
  mainScrollView: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  backgroundImage: {
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  featureBoxContainer: {
    width: '100%'
  },
  featureBox: {
    position: 'relative',
    top: scale(55),
    width: '100%',
    alignItems: 'center'
  },
  innerView: {
    ...Styles.InnerView,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  logoHeader: {
    ...Styles.LogoHeaderScaledStyle,
    container: { ...Styles.LogoHeaderScaledStyle.container }
  },
  shimTiny: { ...Styles.Shim, height: scale(10) },
  shimSmall: { ...Styles.Shim, height: scale(25) },
  shim: Styles.Shim,
  buttonsBox: {
    width: '100%',
    alignItems: 'center'
  },
  modalMiddle: {
    width: '100%',
    height: scale(100)
  },
  input2: Styles.MaterialInput,
  inputModal: {
    ...Styles.MaterialInputOnWhite,
    container: { ...Styles.MaterialInputOnWhite.container, width: '100%' }
  },
  inputWithDrop: Styles.MaterialInputWithDrop,
  forgotButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      fontSize: scale(14),
      color: Constants.WHITE
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      fontSize: scale(14),
      color: Constants.WHITE
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  loginButton: {
    upStyle: Styles.TertiaryButtonUpStyle,
    upTextStyle: Styles.TertiaryButtonTextUpStyle,
    downTextStyle: Styles.TertiaryButtonTextDownStyle,
    downStyle: Styles.TertiaryButtonDownStyle
  },
  signupButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      fontSize: scale(14),
      color: Constants.WHITE
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      fontSize: scale(14),
      color: Constants.WHITE
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  staticModalText: {
    color: Constants.GRAY_1,
    width: '100%',
    fontSize: scale(15),
    textAlign: 'center'
  },
  modal: Styles.SkipModalStyle,
  iconButton: {
    container: {
      position: 'absolute',
      right: 0,
      bottom: (scale(260) - scale(250)) * 1.6
    },
    icon: {
      color: Constants.WHITE
    },
    iconPressed: {
      color: Constants.SECONDARY
    },
    iconSize: scale(Constants.FONTS.defaultFontSize + 8),
    underlayColor: Constants.TRANSPARENT
  },
  usernameWrapper: {
    width: '100%',
    flexDirection: 'row'
  },
  dropDownList: {
    maxHeight: scale(200),
    backgroundColor: '#FFFFFF'
  }
}

export const PasswordLoginScreen = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    error: state.login.errorMessage || '',
    loginSuccess: state.login.loginSuccess,
    password: state.login.password || '',
    previousUsers: state.previousUsers.userList,
    touch: state.touch,
    username: state.login.username,
    usernameOnlyList: state.previousUsers.usernameOnlyList
  }),
  (dispatch: Dispatch) => ({
    deleteUserFromDevice(username) {
      return dispatch(deleteUserFromDevice(username))
    },
    gotoCreatePage() {
      dispatch({ type: 'WORKFLOW_START', data: 'createWF' })
    },
    gotoPinLoginPage() {
      dispatch({ type: 'WORKFLOW_START', data: 'pinWF' })
    },
    updatePassword(data: string) {
      dispatch({ type: 'AUTH_UPDATE_LOGIN_PASSWORD', data: data })
    },
    updateUsername(data: string) {
      dispatch({ type: 'AUTH_UPDATE_USERNAME', data: data })
    },
    userLogin(data: Object) {
      dispatch(userLogin(data))
    }
  })
)(PasswordLoginScreenComponent)
