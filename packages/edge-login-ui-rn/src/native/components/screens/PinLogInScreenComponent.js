// @flow

import React, { Component } from 'react'
import { Platform, Text, TouchableWithoutFeedback, View } from 'react-native'

import s from '../../../common/locales/strings.js'
import DeleteUserConnector from '../../../native/connectors/abSpecific/DeleteUserConnector'
import PinKeypadConnector from '../../../native/connectors/abSpecific/PinKeypadConnector'
import * as Assets from '../../assets/'
import { LogoImageHeader, UserListItem } from '../../components/abSpecific'
import {
  BackgroundImage,
  Button,
  DropDownList,
  HeaderParentButtons,
  ImageButton
} from '../../components/common'
import FourDigitConnector from '../../connectors/abSpecific/FourDigitConnector'

type Props = {
  styles: Object,
  usersWithPin: Array<string>,
  username: string,
  userDetails: Object,
  userList: Array<Object>,
  touch: boolean | string,
  loginSuccess: boolean,
  launchUserLoginWithTouchId(Object): void,
  changeUser(string): void,
  launchDeleteModal(): void,
  gotoLoginPage(): void,
  isTouchIdDisabled: boolean,
  appId?: string,
  backgroundImage?: any,
  primaryLogo?: any,
  primaryLogoCallback?: () => void,
  parentButton?: Object,
  showModal: boolean
}
type State = {
  loggingIn: boolean,
  pin: string,
  username: string,
  focusOn: string,
  usernameList: Array<string>
}
export default class PinLogInScreenComponent extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    const getUserNameList = () => {
      const filteredUserList = props.userList.filter(user => {
        if (user.pinEnabled) {
          return true
        }
        if (user.touchEnabled && props.touch) {
          return true
        }
        return false
      })
      return filteredUserList.map(user => user.username)
    }
    this.state = {
      pin: '',
      loggingIn: false,
      username: '', // Nobody seems to update this?
      focusOn: 'pin',
      usernameList: props.userList ? getUserNameList() : props.usersWithPin
    }
  }
  componentDidMount () {
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
  render () {
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

  renderOverImage () {
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

  renderBottomHalf (style: Object) {
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
          data={this.state.usernameList}
          renderRow={this.renderItems.bind(this)}
        />
      </View>
    )
  }
  exitPin () {
    this.props.gotoLoginPage()
  }

  renderItems (item: Object) {
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
  deleteUser (arg: string) {
    this.setState({
      focusOn: 'pin',
      username: arg
    })
    this.props.launchDeleteModal()
  }
  selectUser (arg: string) {
    this.props.launchUserLoginWithTouchId({ username: arg })
    this.props.changeUser(arg)
    this.setState({
      focusOn: 'pin'
    })
  }
  showDrop () {
    this.setState({
      focusOn: 'List'
    })
  }
  hideDrop () {
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
