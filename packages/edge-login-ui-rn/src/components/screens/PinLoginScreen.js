// @flow

import * as React from 'react'
import {
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { sprintf } from 'sprintf-js'

import { loginWithPin, loginWithTouch } from '../../actions/LoginAction.js'
import { deleteUserFromDevice } from '../../actions/UserActions.js'
import * as Assets from '../../assets/index.js'
import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'
import { type LoginUserInfo } from '../../reducers/PreviousUsersReducer.js'
import * as Styles from '../../styles/index.js'
import { type Branding } from '../../types/Branding.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { scale, scaleH } from '../../util/scaling.js'
import { FourDigit } from '../abSpecific/FourDigitComponent.js'
import { LogoImageHeader } from '../abSpecific/LogoImageHeader.js'
import { PinKeypad } from '../abSpecific/PinKeypad.js'
import { UserListItem } from '../abSpecific/UserListItem.js'
import { BackgroundImage } from '../common/BackgroundImage.js'
import { Button } from '../common/Button.js'
import { HeaderParentButtons } from '../common/HeaderParentButtons.js'
import { ImageButton } from '../common/ImageButton.js'
import { DropDownList } from '../common/index.js'
import { ButtonsModal } from '../modals/ButtonsModal.js'
import { Airship, showError } from '../services/AirshipInstance.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  branding: Branding
}
type StateProps = {
  errorMessage: string,
  isLoggingInWithPin: boolean,
  isTouchIdDisabled: boolean,
  loginSuccess: boolean,
  pin: string,
  touch: $PropertyType<RootState, 'touch'>,
  userDetails: Object,
  userList: LoginUserInfo[],
  username: string,
  wait: number
}
type DispatchProps = {
  changeUser(string): void,
  deleteUserFromDevice(username: string): Promise<void>,
  gotoLoginPage(): void,
  loginWithTouch(username: string): void,
  loginWithPin(username: string, pin: string): void,
  onChangeText(pin: string): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  focusOn: 'pin' | 'List'
}

class PinLoginScreenComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      focusOn: 'pin'
    }
  }

  componentDidMount() {
    if (this.props.username && this.props.touch !== 'FaceID') {
      this.props.loginWithTouch(this.props.username)
    }
  }

  componentDidUpdate() {
    if (
      !this.props.userDetails.touchEnabled &&
      !this.props.userDetails.pinEnabled
    ) {
      this.exitPin()
    }
  }

  handleDelete = (username: string) => {
    const { deleteUserFromDevice } = this.props
    this.setState({ focusOn: 'pin' })

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

  relaunchTouchId = () => {
    this.props.loginWithTouch(this.props.username)
  }

  handlePress = (value: string) => {
    const { loginWithPin, onChangeText, pin, username } = this.props
    const newPin = value === 'back' ? pin.slice(0, -1) : pin.concat(value)
    onChangeText(newPin)
    if (newPin.length === 4) loginWithPin(username, newPin)
  }

  render() {
    return (
      <View style={PinLoginScreenStyle.container}>
        <BackgroundImage
          branding={this.props.branding}
          style={PinLoginScreenStyle.backgroundImage}
          content={this.renderOverImage()}
        />
      </View>
    )
  }

  renderOverImage() {
    const { pin, wait } = this.props
    if (this.props.loginSuccess) {
      return null
    }
    return (
      <View style={PinLoginScreenStyle.featureBoxContainer}>
        <HeaderParentButtons
          branding={{
            ...this.props.branding,
            parentButton: {
              text: s.strings.exit_pin,
              callback: this.exitPin.bind(this)
            }
          }}
        />
        <TouchableWithoutFeedback onPress={this.hideDrop.bind(this)}>
          <View style={PinLoginScreenStyle.featureBox}>
            <LogoImageHeader branding={this.props.branding} />
            <View style={PinLoginScreenStyle.featureBoxBody}>
              {this.renderBottomHalf(PinLoginScreenStyle)}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={PinLoginScreenStyle.spacer_full} />
        {this.props.userDetails.pinEnabled && (
          <PinKeypad
            disabled={wait > 0 || pin.length === 4}
            onPress={this.handlePress}
          />
        )}
      </View>
    )
  }

  renderBottomHalf(style: typeof PinLoginScreenStyle) {
    const { errorMessage, isLoggingInWithPin, pin, wait } = this.props

    if (this.state.focusOn === 'pin') {
      return (
        <View style={style.innerView}>
          <Button
            onPress={this.showDrop.bind(this)}
            label={this.props.username}
            downStyle={style.usernameButton.downStyle}
            downTextStyle={style.usernameButton.downTextStyle}
            upStyle={style.usernameButton.upStyle}
            upTextStyle={style.usernameButton.upTextStyle}
          />
          {this.props.userDetails.pinEnabled && (
            <FourDigit
              error={
                wait > 0
                  ? `${errorMessage}: ${sprintf(
                      s.strings.account_locked_for,
                      wait
                    )}`
                  : errorMessage
              }
              pin={pin}
              spinner={wait > 0 || pin.length === 4 || isLoggingInWithPin}
            />
          )}
          {!this.props.userDetails.pinEnabled && <View style={style.spacer} />}
          {this.renderTouchImage()}
          <Text style={style.touchImageText}>
            {this.renderTouchImageText()}
          </Text>
        </View>
      )
    }
    return (
      <View style={style.innerView}>
        <DropDownList
          style={style.listView}
          data={this.getDropdownItems()}
          renderRow={this.renderItems.bind(this)}
        />
      </View>
    )
  }

  exitPin() {
    this.props.gotoLoginPage()
  }

  getDropdownItems(): string[] {
    const { userList, touch } = this.props
    return userList
      .filter(user => user.pinEnabled || (touch && user.touchEnabled))
      .map(user => user.username)
  }

  renderItems(item: Object) {
    return (
      <UserListItem
        data={item.item}
        style={PinLoginScreenStyle.listItem}
        onClick={this.selectUser.bind(this)}
        onDelete={this.handleDelete}
      />
    )
  }

  selectUser(username: string) {
    this.props.loginWithTouch(username)
    this.props.changeUser(username)
    this.setState({
      focusOn: 'pin'
    })
  }

  showDrop() {
    this.setState({
      focusOn: 'List'
    })
  }

  hideDrop() {
    this.setState({
      focusOn: 'pin'
    })
  }

  renderTouchImage = () => {
    const { touch, userDetails } = this.props
    const { touchEnabled } = userDetails
    if (touchEnabled && touch === 'FaceID') {
      return (
        <ImageButton
          style={{}}
          source={Assets.FACE_ID}
          onPress={this.relaunchTouchId}
          disabled={this.props.isTouchIdDisabled}
        />
      )
    }
    if (touchEnabled && touch === 'TouchID') {
      return (
        <ImageButton
          style={{}}
          source={Assets.TOUCH_ID}
          onPress={this.relaunchTouchId}
          disabled={this.props.isTouchIdDisabled}
        />
      )
    }
    if (!touchEnabled || !touch) {
      return null
    }
    return null
  }

  renderTouchImageText = () => {
    const { touch, userDetails } = this.props
    const { touchEnabled } = userDetails
    if (touchEnabled && touch === 'FaceID') {
      return s.strings.use_faceId
    }
    if (touchEnabled && touch === 'TouchID' && Platform.OS === 'ios') {
      return s.strings.use_touchId
    }
    if (touchEnabled && touch === 'TouchID' && Platform.OS !== 'ios') {
      return s.strings.use_fingerprint
    }
    return ''
  }
}

const PinLoginScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center'
  },
  innerView: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  featureBoxContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  featureBox: {
    position: 'relative',
    top: scale(40),
    width: '100%',
    alignItems: 'center'
  },
  featureBoxBody: {
    height: scale(240),
    width: '100%'
  },
  thumbprintButton: {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    image: {
      position: 'relative',
      marginRight: '5%'
    }
  },
  listView: {
    height: scale(250),
    width: scaleH(160)
  },
  listItem: {
    container: {
      height: scale(40),
      width: '100%',
      backgroundColor: Constants.PRIMARY,
      flexDirection: 'row',
      alignItems: 'center'
    },
    textComtainer: {
      flex: 25,
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    iconButton: {
      container: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%'
      },
      icon: {
        color: Constants.WHITE
      },
      iconPressed: {
        color: Constants.WHITE
      },
      iconSize: scale(Constants.FONTS.defaultFontSize),
      underlayColor: Constants.TRANSPARENT
    },
    text: {
      paddingLeft: scale(20),
      color: Constants.WHITE,
      backgroundColor: Constants.TRANSPARENT,
      fontFamily: Constants.FONTS.fontFamilyRegular,
      fontSize: scale(Constants.FONTS.defaultFontSize)
    }
  },
  dropInput: {
    container: {
      width: 200,
      height: scale(30),
      // backgroundColor: Constants.WHITE,
      marginBottom: scale(20)
    }
  },
  usernameButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      color: Constants.WHITE,
      fontSize: scale(24)
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      color: Constants.WHITE,
      fontSize: scale(24)
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  exitButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      color: Constants.WHITE,
      fontSize: scale(16)
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      color: Constants.WHITE,
      fontSize: scale(16)
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  spacer: {
    marginTop: scale(35)
  },
  spacer_full: {
    flex: 1,
    zIndex: -100
  },
  touchImageText: {
    marginTop: scale(8),
    color: Constants.ACCENT_MINT
  }
}

export const PinLoginScreen = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    errorMessage: state.login.errorMessage || '',
    isLoggingInWithPin: state.login.isLoggingInWithPin,
    isTouchIdDisabled:
      state.login.loginSuccess ||
      !!state.login.wait ||
      state.login.isLoggingInWithPin ||
      (state.login.pin ? state.login.pin.length : 0) === 4,
    loginSuccess: state.login.loginSuccess,
    pin: state.login.pin || '',
    touch: state.touch,
    userDetails: state.previousUsers.userList.find(
      user => user.username === state.login.username
    ) || {
      username: state.login.username,
      isPinEnabled: false,
      isTouchIdEnabled: false
    },
    userList: state.previousUsers.userList,
    username: state.login.username,
    wait: state.login.wait
  }),
  (dispatch: Dispatch) => ({
    changeUser: (data: string) => {
      dispatch({ type: 'AUTH_UPDATE_USERNAME', data: data })
    },
    deleteUserFromDevice(username) {
      return dispatch(deleteUserFromDevice(username))
    },
    gotoLoginPage: () => {
      dispatch({ type: 'START_PASSWORD_LOGIN' })
    },
    loginWithTouch(username) {
      dispatch(loginWithTouch(username)).catch(showError)
    },
    loginWithPin(username, pin) {
      dispatch(loginWithPin(username, pin))
    },
    onChangeText(pin: string) {
      dispatch({ type: 'AUTH_UPDATE_PIN', data: pin })
    }
  })
)(PinLoginScreenComponent)
