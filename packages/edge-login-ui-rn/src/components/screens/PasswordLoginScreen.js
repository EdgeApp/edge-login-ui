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
import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'
import { type LoginUserInfo } from '../../reducers/PreviousUsersReducer.js'
import * as Styles from '../../styles/index.js'
import { type Branding } from '../../types/Branding.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { type LoginAttempt } from '../../util/loginAttempt.js'
import { scale } from '../../util/scaling.js'
import { LogoImageHeader } from '../abSpecific/LogoImageHeader.js'
import { UserListItem } from '../abSpecific/UserListItem.js'
import { BackgroundImage } from '../common/BackgroundImage.js'
import { Button } from '../common/Button.js'
import { HeaderParentButtons } from '../common/HeaderParentButtons.js'
import { DropDownList, FormField } from '../common/index.js'
import { ButtonsModal } from '../modals/ButtonsModal.js'
import { QrCodeModal } from '../modals/QrCodeModal.js'
import { Airship, showError } from '../services/AirshipInstance.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  branding: Branding
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
  constructor(props: Props) {
    super(props)
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

    this.handleBlur()
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

  handleBlur = () => {
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
        style={styles.container}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.mainScrollView}
      >
        <BackgroundImage
          branding={this.props.branding}
          style={styles.backgroundImage}
          content={this.renderOverImage()}
          onPress={this.handleBlur}
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
      <View style={styles.featureBoxContainer}>
        <HeaderParentButtons branding={this.props.branding} />
        <TouchableWithoutFeedback onPress={this.handleBlur}>
          <View style={styles.featureBox}>
            <LogoImageHeader branding={this.props.branding} />
            {this.renderUsername()}
            <View style={styles.shimTiny} />
            <FormField
              testID="passwordFormField"
              style={styles.input2}
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              label={s.strings.password}
              error={this.state.errorMessage}
              autoCorrect={false}
              secureTextEntry
              returnKeyType="go"
              forceFocus={this.state.focusSecond}
              onFocus={this.handleFocus2}
              onSubmitEditing={this.handleSubmit}
            />
            {this.renderButtons()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  renderUsername() {
    return (
      <View>
        <View style={styles.usernameWrapper}>
          <FormField
            testID="usernameFormField"
            style={styles.input2}
            onChangeText={this.handleChangeUsername}
            value={this.props.username}
            label={s.strings.username}
            returnKeyType="next"
            autoCorrect={false}
            autoFocus={this.state.focusFirst}
            forceFocus={this.state.focusFirst}
            onFocus={this.handleFocus1}
            onSubmitEditing={this.handleSetNextFocus}
          />
          <TouchableOpacity
            style={styles.iconButton.container}
            onPress={this.handleToggleUsernameList}
          >
            {this.state.usernameList ? (
              <MaterialIcon
                name="expand-less"
                size={styles.iconButton.iconSize}
                style={styles.iconButton.icon}
              />
            ) : (
              <MaterialIcon
                name="expand-more"
                size={styles.iconButton.iconSize}
                style={styles.iconButton.icon}
              />
            )}
          </TouchableOpacity>
        </View>
        {this.state.usernameList && this.renderDropdownList()}
      </View>
    )
  }

  renderDropdownList() {
    return (
      <DropDownList
        style={styles.dropDownList}
        data={this.props.usernameOnlyList}
        renderRow={this.renderRow}
      />
    )
  }

  renderRow = (data: Object) => {
    return (
      <UserListItem
        data={data.item}
        style={styles.listItem}
        onClick={this.handleSelectUser}
        onDelete={this.handleDelete}
      />
    )
  }

  renderButtons() {
    return (
      <View style={styles.buttonsBox}>
        <View style={styles.shimTiny} />
        <Button
          onPress={this.handleForgotPassword}
          label={s.strings.forgot_password}
          downStyle={styles.forgotButton.downStyle}
          downTextStyle={styles.forgotButton.downTextStyle}
          upStyle={styles.forgotButton.upStyle}
          upTextStyle={styles.forgotButton.upTextStyle}
        />
        <View style={styles.shimTiny} />
        <Button
          testID="loginButton"
          onPress={this.handleSubmit}
          label={s.strings.login_button}
          downStyle={styles.loginButton.downStyle}
          downTextStyle={styles.loginButton.downTextStyle}
          upStyle={styles.loginButton.upStyle}
          upTextStyle={styles.loginButton.upTextStyle}
          isThinking={this.state.loggingIn}
          doesThink
        />
        <View style={styles.shimTiny} />
        <Button
          testID="createAccountButton"
          onPress={this.handleCreateAccount}
          label={s.strings.create_an_account}
          downStyle={styles.signupButton.downStyle}
          downTextStyle={styles.signupButton.downTextStyle}
          upStyle={styles.signupButton.upStyle}
          upTextStyle={styles.signupButton.upTextStyle}
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

  handleToggleUsernameList = () => {
    Keyboard.dismiss()
    this.setState({
      focusFirst: false,
      focusSecond: false,
      usernameList: !this.state.usernameList
    })
  }

  handleFocus1 = () => {
    this.setState({
      focusFirst: true,
      focusSecond: false
    })
  }

  handleFocus2 = () => {
    this.setState({
      focusFirst: false,
      focusSecond: true
    })
  }

  handleSetNextFocus = () => {
    this.setState({
      focusFirst: false,
      focusSecond: true
    })
  }

  handleSelectUser = (username: string) => {
    this.handleChangeUsername(username)
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
    this.handleSetNextFocus()
  }

  handleChangeUsername = (data: string) => {
    this.setState({ errorMessage: '' })
    this.props.updateUsername(data)
  }

  handleForgotPassword = () => {
    Keyboard.dismiss()
    Airship.show(bridge => (
      <ButtonsModal
        bridge={bridge}
        message={s.strings.initiate_password_recovery}
        buttons={{ ok: { label: s.strings.ok } }}
      />
    ))
  }

  handleCreateAccount = () => {
    this.props.gotoCreatePage()
  }
}

const styles = {
  container: Styles.ScreenStyle,
  mainScrollView: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  backgroundImage: {
    flex: 1,
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
  shimTiny: {
    width: '100%',
    height: scale(10)
  },
  buttonsBox: {
    width: '100%',
    alignItems: 'center'
  },
  input2: {
    container: {
      position: 'relative',
      width: '70%',
      minHeight: scale(60)
    },
    baseColor: Constants.WHITE,
    tintColor: Constants.ACCENT_MINT,
    errorColor: Constants.ACCENT_RED,
    textColor: Constants.WHITE,
    affixTextStyle: {
      color: Constants.WHITE
    },
    titleTextStyle: {
      color: Constants.WHITE
    }
  },
  listItem: {
    container: {
      height: scale(40),
      width: '100%',
      backgroundColor: Constants.WHITE,
      borderBottomColor: Constants.GRAY_4,
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    textComtainer: {
      flex: 9,
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    iconButton: {
      container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%'
      },
      icon: {
        color: Constants.PRIMARY
      },
      iconPressed: {
        color: Constants.SECONDARY
      },
      iconSize: scale(Constants.FONTS.defaultFontSize),
      underlayColor: Constants.TRANSPARENT
    },
    text: {
      color: Constants.PRIMARY,
      backgroundColor: Constants.TRANSPARENT,
      fontFamily: Constants.FONTS.fontFamilyRegular,
      marginLeft: scale(8),
      fontSize: scale(Constants.FONTS.defaultFontSize)
    }
  },
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
