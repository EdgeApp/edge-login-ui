import { OtpError } from 'edge-core-js'
import * as React from 'react'
import {
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { sprintf } from 'sprintf-js'

import { launchPasswordRecovery, login } from '../../actions/LoginAction'
import { deleteUserFromDevice } from '../../actions/UserActions'
import s from '../../common/locales/strings'
import * as Constants from '../../constants/index'
import { LoginUserInfo } from '../../reducers/PreviousUsersReducer'
import * as Styles from '../../styles/index'
import { Branding } from '../../types/Branding'
import { Dispatch, RootState } from '../../types/ReduxTypes'
import { LoginAttempt } from '../../util/loginAttempt'
import { scale } from '../../util/scaling'
import { LogoImageHeader } from '../abSpecific/LogoImageHeader'
import { UserListItem } from '../abSpecific/UserListItem'
import { BackgroundImage } from '../common/BackgroundImage'
import { Button } from '../common/Button'
import { FormField } from '../common/FormField'
import { HeaderParentButtons } from '../common/HeaderParentButtons'
import { ButtonsModal } from '../modals/ButtonsModal'
import { showQrCodeModal } from '../modals/QrCodeModal'
import { TextInputModal } from '../modals/TextInputModal'
import { Airship, showError } from '../services/AirshipInstance'
import { connect } from '../services/ReduxStore'
import { MainButton } from '../themed/MainButton'

interface OwnProps {
  branding: Branding
}
interface StateProps {
  loginSuccess: boolean
  previousUsers: LoginUserInfo[]
  touch: RootState['touch']
  username: string
  usernameOnlyList: string[]
}
interface DispatchProps {
  deleteUserFromDevice: (username: string) => Promise<void>
  gotoCreatePage: () => void
  gotoPinLoginPage: () => void
  handleQrModal: () => void
  login: (attempt: LoginAttempt) => Promise<void>
  saveOtpError: (otpAttempt: LoginAttempt, otpError: OtpError) => void
  updateUsername: (username: string) => void
  handlePasswordRecovery: (recoveryKey: string) => Promise<boolean>
}
type Props = OwnProps & StateProps & DispatchProps

interface State {
  errorMessage: string
  focusFirst: boolean
  focusSecond: boolean
  password: string
  usernameList: boolean
}

class PasswordLoginSceneComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      errorMessage: '',
      focusFirst: true,
      focusSecond: false,
      password: '',
      usernameList: false
    }
  }

  handlePasswordChange = (password: string) => {
    this.setState({ errorMessage: '', password })
  }

  handleSubmit = async () => {
    const { login, saveOtpError, username } = this.props
    const { password } = this.state

    this.handleBlur()
    Keyboard.dismiss()

    const attempt: LoginAttempt = { type: 'password', username, password }
    await login(attempt).catch(error => {
      if (error != null && error.name === 'OtpError') {
        saveOtpError(attempt, error)
      } else {
        console.log(error)
        const errorMessage = error != null ? error.message : ''
        this.setState({ errorMessage })
      }
    })
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
      .then(async button => {
        if (button !== 'ok') return
        return await deleteUserFromDevice(username)
      })
      .catch(showError)
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
      <FlatList
        style={styles.dropDownList}
        data={this.props.usernameOnlyList}
        renderItem={this.renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }

  renderRow = (data: { item: string }) => {
    return (
      <UserListItem
        data={data.item}
        onClick={this.handleSelectUser}
        onDelete={this.handleDelete}
      />
    )
  }

  renderButtons() {
    const { handleQrModal } = this.props

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
        <View style={styles.loginButtonBox}>
          <MainButton
            label={s.strings.login_button}
            testID="loginButton"
            type="secondary"
            onPress={this.handleSubmit}
          />
        </View>
        <Button
          testID="createAccountButton"
          onPress={this.handleCreateAccount}
          label={s.strings.create_an_account}
          downStyle={styles.signupButton.downStyle}
          downTextStyle={styles.signupButton.downTextStyle}
          upStyle={styles.signupButton.upStyle}
          upTextStyle={styles.signupButton.upTextStyle}
        />
        <TouchableOpacity onPress={handleQrModal}>
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

    const details: LoginUserInfo | undefined = this.props.previousUsers.find(
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
      <TextInputModal
        bridge={bridge}
        onSubmit={this.props.handlePasswordRecovery}
        title={s.strings.password_recovery}
        message={s.strings.initiate_password_recovery}
        inputLabel={s.strings.recovery_token}
      />
    ))
  }

  handleCreateAccount = () => {
    this.props.gotoCreatePage()
  }
}

const styles = {
  container: Styles.SceneStyle,
  mainScrollView: {
    position: 'relative',
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
  loginButtonBox: {
    marginVertical: scale(10),
    width: '70%'
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
} as const

export const PasswordLoginScene = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    loginSuccess: state.login.loginSuccess,
    previousUsers: state.previousUsers.userList,
    touch: state.touch,
    username: state.login.username,
    usernameOnlyList: state.previousUsers.usernameOnlyList
  }),
  (dispatch: Dispatch) => ({
    async deleteUserFromDevice(username) {
      return await dispatch(deleteUserFromDevice(username))
    },
    gotoCreatePage() {
      dispatch({ type: 'NEW_ACCOUNT_WELCOME' })
    },
    gotoPinLoginPage() {
      dispatch({ type: 'START_PIN_LOGIN' })
    },
    handleQrModal() {
      Keyboard.dismiss()
      dispatch(showQrCodeModal())
    },
    async login(attempt) {
      return await dispatch(login(attempt))
    },
    saveOtpError(attempt, error) {
      dispatch({ type: 'OTP_ERROR', data: { attempt, error } })
    },
    updateUsername(data: string) {
      dispatch({ type: 'AUTH_UPDATE_USERNAME', data: data })
    },
    async handlePasswordRecovery(recoveryKey: string): Promise<boolean> {
      dispatch(launchPasswordRecovery(recoveryKey))
      return await Promise.resolve(true)
    }
  })
)(PasswordLoginSceneComponent)
