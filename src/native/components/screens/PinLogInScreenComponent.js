import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { BackgroundImage, Button, ScrollingList } from '../../components/common'
import { LogoImageHeader, UserListItem } from '../../components/abSpecific'
import FourDigitInputConnector
  from '../../connectors/abSpecific/FourDigitInputConnector'
// import * as Constants from '../../../common/constants'
import * as Assets from '../../assets/'

export default class PinLogInScreenComponent extends Component {
  componentWillMount () {
    this.setState({
      pin: '',
      loggingIn: false,
      focusOn: 'pin'
    })
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
      return (
        <View style={PinLoginScreenStyle.featureBox}>
          <Text>LOGIN SUCCESS</Text>
        </View>
      )
    }
    return (
      <View style={PinLoginScreenStyle.featureBox}>
        <LogoImageHeader style={PinLoginScreenStyle.logoHeader} />
        <View style={PinLoginScreenStyle.featureBoxBody}>
          {this.renderBottomHalf(PinLoginScreenStyle)}
        </View>
      </View>
    )
  }

  renderBottomHalf (style) {
    if (this.state.focusOn === 'pin') {
      return (
        <View style={style.innerView}>
          <Button
            onPress={this.showDrop.bind(this)}
            label={this.props.username}
            downStyle={style.forgotButton.downStyle}
            downTextStyle={style.forgotButton.downTextStyle}
            upStyle={style.forgotButton.upStyle}
            upTextStyle={style.forgotButton.upTextStyle}
          />
          <FourDigitInputConnector style={style.fourPin} />
          <Button
            onPress={this.exitPin.bind(this)}
            label={'EXIT PIN'}
            downStyle={style.forgotButton.downStyle}
            downTextStyle={style.forgotButton.downTextStyle}
            upStyle={style.forgotButton.upStyle}
            upTextStyle={style.forgotButton.upTextStyle}
          />
        </View>
      )
    }
    return (
      <View style={style.innerView}>
        <ScrollingList
          style={style.listView}
          getListItemsFunction={this.renderItems.bind(this)}
          dataList={this.props.usersWithPin}
        />
      </View>
    )
  }
  exitPin () {
    this.props.gotoLoginPage()
  }

  renderItems (item) {
    const { PinLoginScreenStyle } = this.props.styles
    return (
      <UserListItem
        key={'key ' + item}
        data={item}
        style={PinLoginScreenStyle.listItem}
        onClick={this.selectUser.bind(this)}
      />
    )
  }
  selectUser (arg) {
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
