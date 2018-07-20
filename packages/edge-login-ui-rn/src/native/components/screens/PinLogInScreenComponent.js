// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import s from '../../../common/locales/strings.js'
import DeleteUserConnector from '../../../native/connectors/abSpecific/DeleteUserConnector'
import * as Assets from '../../assets/'
import { LogoImageHeader, UserListItem } from '../../components/abSpecific'
import {
  BackgroundImage,
  Button,
  DropDownList,
  ImageButton
} from '../../components/common'
import FourDigitInputConnector from '../../connectors/abSpecific/FourDigitInputConnector'

type Props = {
  styles: Object,
  usersWithPin: Array<string>,
  username: string,
  launchUserLoginWithTouchId(Object): void,
  changeUser(string): void,
  launchDeleteModal(): void,
  gotoLoginPage(): void
}
type State = {
  loggingIn: boolean,
  pin: string,
  username: string,
  focusOn: string
}
export default class PinLogInScreenComponent extends Component<Props, State> {
  componentWillMount () {
    this.setState({
      pin: '',
      loggingIn: false,
      focusOn: 'pin'
    })
  }
  componentDidMount () {
    if (this.props.username) {
      this.props.launchUserLoginWithTouchId({ username: this.props.username })
    }
  }
  relaunchTouchId = () => {
    this.props.launchUserLoginWithTouchId({ username: this.props.username })
  }
  renderTouchButton = (style: Object) => {
    if (this.props.username) {
      return (
        <ImageButton
          style={style.thumbprintButton}
          source={Assets.TOUCH}
          onPress={this.relaunchTouchId}
        />
      )
    }
    return null
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
          src={Assets.LOGIN_BACKGROUND}
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
      <View style={PinLoginScreenStyle.featureBox}>
        <LogoImageHeader style={PinLoginScreenStyle.logoHeader} />
        <View style={PinLoginScreenStyle.featureBoxBody}>
          {this.renderBottomHalf(PinLoginScreenStyle)}
        </View>
        {this.renderTouchButton(PinLoginScreenStyle)}
        {this.renderModal(PinLoginScreenStyle)}
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
          <FourDigitInputConnector style={style.fourPin} />
          <Button
            onPress={this.exitPin.bind(this)}
            label={s.strings.exit_pin}
            downStyle={style.exitButton.downStyle}
            downTextStyle={style.exitButton.downTextStyle}
            upStyle={style.exitButton.upStyle}
            upTextStyle={style.exitButton.upTextStyle}
          />
        </View>
      )
    }
    return (
      <View style={style.innerView}>
        <DropDownList
          style={style.listView}
          data={this.props.usersWithPin}
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
    if (this.props.usersWithPin.length < 2) {
      return
    }
    this.setState({
      focusOn: 'List'
    })
  }
}
