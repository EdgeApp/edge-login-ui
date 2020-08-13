// @flow

import React, { Component } from 'react'
import { Platform, Text, TouchableWithoutFeedback, View } from 'react-native'

import { userLoginWithTouchId } from '../../actions/LoginAction.js'
import * as Assets from '../../assets/index.js'
import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'
import { type LoginUserInfo } from '../../reducers/PreviousUsersReducer.js'
import * as Styles from '../../styles/index.js'
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
import { DeleteUserModal } from '../modals/DeleteUserModal.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  appId?: string,
  backgroundImage?: any,
  parentButton?: Object,
  primaryLogo?: any,
  primaryLogoCallback?: () => void,
  touch: boolean | string
}
type StateProps = {
  isTouchIdDisabled: boolean,
  loginSuccess: boolean,
  showModal: boolean,
  userDetails: Object,
  userList: Array<LoginUserInfo>,
  username: string
}
type DispatchProps = {
  changeUser(string): void,
  gotoLoginPage(): void,
  launchDeleteModal(): void,
  launchUserLoginWithTouchId(Object): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  loggingIn: boolean,
  pin: string,
  username: string,
  focusOn: string
}

class PinLoginScreenComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      pin: '',
      loggingIn: false,
      username: '', // User we are deleting
      focusOn: 'pin'
    }
  }

  componentDidMount() {
    if (this.props.username && this.props.touch !== 'FaceID') {
      this.props.launchUserLoginWithTouchId({ username: this.props.username })
    }
  }

  relaunchTouchId = () => {
    this.props.launchUserLoginWithTouchId({ username: this.props.username })
  }

  renderModal = (style: typeof PinLoginScreenStyle) => {
    if (this.props.showModal) {
      return (
        <DeleteUserModal
          style={style.modal.skip}
          username={this.state.username}
        />
      )
    }
    return null
  }

  render() {
    return (
      <View style={PinLoginScreenStyle.container}>
        <BackgroundImage
          src={this.props.backgroundImage || Assets.LOGIN_BACKGROUND}
          style={PinLoginScreenStyle.backgroundImage}
          content={this.renderOverImage()}
        />
      </View>
    )
  }

  renderOverImage() {
    if (this.props.loginSuccess) {
      return null
    }
    return (
      <View style={PinLoginScreenStyle.featureBoxContainer}>
        <HeaderParentButtons
          parentButton={{
            text: s.strings.exit_pin,
            callback: this.exitPin.bind(this)
          }}
          appId={this.props.appId}
        />
        <TouchableWithoutFeedback onPress={this.hideDrop.bind(this)}>
          <View style={PinLoginScreenStyle.featureBox}>
            <LogoImageHeader
              style={PinLoginScreenStyle.logoHeader}
              src={this.props.primaryLogo}
              callback={this.props.primaryLogoCallback}
            />
            <View style={PinLoginScreenStyle.featureBoxBody}>
              {this.renderBottomHalf(PinLoginScreenStyle)}
            </View>
            {this.renderModal(PinLoginScreenStyle)}
          </View>
        </TouchableWithoutFeedback>
        <View style={PinLoginScreenStyle.spacer_full} />
        {this.props.userDetails.pinEnabled && (
          <PinKeypad style={PinLoginScreenStyle.keypad} />
        )}
      </View>
    )
  }

  renderBottomHalf(style: typeof PinLoginScreenStyle) {
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
            <FourDigit style={style.fourPin} />
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
        onDelete={this.deleteUser.bind(this)}
      />
    )
  }

  deleteUser(arg: string) {
    this.setState({
      focusOn: 'pin',
      username: arg
    })
    this.props.launchDeleteModal()
  }

  selectUser(arg: string) {
    this.props.launchUserLoginWithTouchId({ username: arg })
    this.props.changeUser(arg)
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
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center'
  },
  innerView: {
    ...Styles.InnerView,
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
  logoHeader: Styles.LogoHeaderScaledStyle,
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
  fourPin: {
    marginTop: scale(20),
    ...Styles.FourDotInputStyle
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
  modal: Styles.SkipModalStyle,
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
  },
  keypad: Styles.PinKeypadStyle
}

export const PinLoginScreen = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    isTouchIdDisabled:
      state.login.loginSuccess ||
      !!state.login.wait ||
      state.login.isLoggingInWithPin ||
      (state.login.pin ? state.login.pin.length : 0) === 4,
    loginSuccess: state.login.loginSuccess,
    showModal: state.workflow.showModal,
    userDetails: state.previousUsers.userList.find(
      user => user.username === state.login.username
    ) || {
      username: state.login.username,
      isPinEnabled: false,
      isTouchIdEnabled: false
    },
    userList: state.previousUsers.userList,
    username: state.login.username
  }),
  (dispatch: Dispatch) => ({
    changeUser: (data: string) => {
      dispatch({ type: 'AUTH_UPDATE_USERNAME', data: data })
    },
    gotoLoginPage: () => {
      dispatch({ type: 'WORKFLOW_START', data: 'passwordWF' })
    },
    launchDeleteModal: () => {
      dispatch({ type: 'WORKFLOW_LAUNCH_MODAL' })
    },
    launchUserLoginWithTouchId: (data: Object) => {
      dispatch(userLoginWithTouchId(data))
    }
  })
)(PinLoginScreenComponent)
