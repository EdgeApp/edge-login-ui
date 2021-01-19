// @flow

import { type OtpError } from 'edge-core-js'
import * as React from 'react'
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { sprintf } from 'sprintf-js'

import { login } from '../../actions/LoginAction.js'
import { deleteUserFromDevice } from '../../actions/UserActions.js'
import * as Assets from '../../assets/'
import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'
import { type LoginUserInfo } from '../../reducers/PreviousUsersReducer.js'
import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { type LoginAttempt } from '../../util/loginAttempt.js'
import { scale } from '../../util/scaling.js'
import { LogoImageHeader } from '../abSpecific/LogoImageHeader.js'
import { UserListItem } from '../abSpecific/UserListItem.js'
import { BackgroundImage } from '../common/BackgroundImage.js'
import { Button } from '../common/Button.js'
import { HeaderParentButtons } from '../common/HeaderParentButtons.js'
import { IconButton } from '../common/IconButton.js'
import { DropDownList, FormField } from '../common/index.js'
import { ButtonsModal } from '../modals/ButtonsModal.js'
import { QrCodeModal } from '../modals/QrCodeModal.js'
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
  loginSuccess: boolean,
  previousUsers: LoginUserInfo[],
  touch: $PropertyType<RootState, 'touch'>,
  username: string,
  usernameOnlyList: string[]
}
type DispatchProps = {
  deleteUserFromDevice(username: string): Promise<void>,
  gotoCreatePage(): void,
  gotoPinLoginPage(): void,
  login(attempt: LoginAttempt): Promise<void>,
  saveOtpError(otpAttempt: LoginAttempt, otpError: OtpError): void,
  updateUsername(string): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  errorMessage: string,
  focusFirst: boolean,
  focusSecond: boolean,
  loggingIn: boolean,
  password: string,
  usernameList: boolean
}

class PasswordLoginScreenComponent extends React.Component<Props, State> {
  // eslint-disable-next-line no-use-before-define
  style: typeof LoginPasswordScreenStyle

  constructor(props: Props) {
    super(props)
    this.style = LoginPasswordScreenStyle
    this.state = {
      errorMessage: '',
      focusFirst: true,
      focusSecond: false,
      loggingIn: false,
      password: '',
      usernameList: false
    }
  }

  handlePasswordChange = (password: string) => {
    this.setState({ errorMessage: '', password })
  }

  handleSubmit = () => {
    const { login, saveOtpError, username } = this.props
    const { password } = this.state

    this.noFocus()
    Keyboard.dismiss()
    this.setState({
      loggingIn: true
    })

    const attempt = { type: 'password', username, password }
    login(attempt)
      .catch(error => {
        if (error != null && error.name === 'OtpError') {
          saveOtpError(attempt, error)
        } else {
          console.log(error)
          const errorMessage = error != null ? error.message : ''
          this.setState({ errorMessage })
        }
      })
      .then(() => this.setState({ loggingIn: false }))
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

    Keyboard.dismiss()
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

  handleQrModal = () => {
    Airship.show(bridge => <QrCodeModal bridge={bridge} />)
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
              src={this.props.primaryLogo}
              callback={this.props.primaryLogoCallback}
            />
            {this.renderUsername(this.style)}
            <View style={this.style.shimTiny} />
            <FormField
              testID="passwordFormField"
              style={this.style.input2}
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              label={s.strings.password}
              error={this.state.errorMessage}
              autoCorrect={false}
              secureTextEntry
              returnKeyType="go"
              forceFocus={this.state.focusSecond}
              onFocus={this.onfocusTwo.bind(this)}
              onSubmitEditing={this.handleSubmit}
            />
            {this.renderButtons(this.style)}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  renderUsername(styles: typeof LoginPasswordScreenStyle) {
    const icon = this.state.usernameList ? (
      <MaterialIcon
        style={styles.iconButton.icon}
        name="expand-less"
        size={styles.iconButton.iconSize}
      />
    ) : (
      <MaterialIcon
        style={styles.iconButton.icon}
        name="expand-more"
        size={styles.iconButton.iconSize}
      />
    )
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
            icon={icon}
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
          onPress={this.handleSubmit}
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
        <TouchableOpacity onPress={this.handleQrModal}>
          <AntDesignIcon
            name="qrcode"
            color={Constants.WHITE}
            size={scale(28)}
          />
        </TouchableOpacity>
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
    this.setState({ errorMessage: '' })
    this.props.updateUsername(data)
  }

  onForgotPassword() {
    Keyboard.dismiss()
    Airship.show(bridge => (
      <ButtonsModal
        bridge={bridge}
        message={s.strings.initiate_password_recovery}
        buttons={{ ok: { label: s.strings.ok } }}
      />
    ))
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
  shimTiny: { ...Styles.Shim, height: scale(10) },
  buttonsBox: {
    width: '100%',
    alignItems: 'center'
  },
  input2: Styles.MaterialInput,
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
    loginSuccess: state.login.loginSuccess,
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
      dispatch({ type: 'START_CREATE_ACCOUNT' })
    },
    gotoPinLoginPage() {
      dispatch({ type: 'START_PIN_LOGIN' })
    },
    login(attempt) {
      return dispatch(login(attempt))
    },
    saveOtpError(attempt, error) {
      dispatch({ type: 'OTP_ERROR', data: { attempt, error } })
    },
    updateUsername(data: string) {
      dispatch({ type: 'AUTH_UPDATE_USERNAME', data: data })
    }
  })
)(PasswordLoginScreenComponent)
