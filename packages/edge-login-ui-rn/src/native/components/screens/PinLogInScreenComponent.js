// @flow

import React, { Component } from 'react'
import { Platform, Text, TouchableWithoutFeedback, View } from 'react-native'
import { connect } from 'react-redux'

import { userLoginWithTouchId } from '../../../common/actions/LoginAction.js'
import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import { type LoginUserInfo } from '../../../common/reducers/PreviousUsersReducer.js'
import DeleteUserConnector from '../../../native/connectors/abSpecific/DeleteUserConnector'
import PinKeypadConnector from '../../../native/connectors/abSpecific/PinKeypadConnector'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes'
import * as Assets from '../../assets/'
import { LogoImageHeader } from '../../components/abSpecific/LogoImageHeader.js'
import { UserListItem } from '../../components/abSpecific/UserListItem.js'
import {
  BackgroundImage,
  Button,
  DropDownList,
  HeaderParentButtons,
  ImageButton
} from '../../components/common'
import FourDigitConnector from '../../connectors/abSpecific/FourDigitConnector'

type OwnProps = {
  styles: Object,
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

class PinLogInScreenComponent extends Component<Props, State> {
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

  renderModal = (style: Object) => {
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

  render() {
    const { PinLoginScreenStyle } = this.props.styles
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
    const { PinLoginScreenStyle } = this.props.styles
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
          styles={this.props.styles.HeaderParentButtons}
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
          <PinKeypadConnector style={PinLoginScreenStyle.keypad} />
        )}
      </View>
    )
  }

  renderBottomHalf(style: Object) {
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
            <FourDigitConnector style={style.fourPin} />
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
    const { PinLoginScreenStyle } = this.props.styles
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

export const PinLoginScreen = connect(
  (state: RootState): StateProps => ({
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
  (dispatch: Dispatch): DispatchProps => ({
    changeUser: (data: string) => {
      dispatch({ type: 'AUTH_UPDATE_USERNAME', data: data })
    },
    gotoLoginPage: () => {
      dispatch({ type: 'WORKFLOW_START', data: Constants.WORKFLOW_PASSWORD })
    },
    launchDeleteModal: () => {
      dispatch({ type: 'WORKFLOW_LAUNCH_MODAL' })
    },
    launchUserLoginWithTouchId: (data: Object) => {
      dispatch(userLoginWithTouchId(data))
    }
  })
)(PinLogInScreenComponent)
