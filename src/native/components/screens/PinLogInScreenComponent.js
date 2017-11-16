import React, { Component } from 'react'
import { View } from 'react-native'
import { BackgroundImage, Button, ScrollingList, ImageButton } from '../../components/common'
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
    this.relaunchTouchId = () => {
      console.log('BUTTON PRESSEd ')
      this.props.launchUserLoginWithTouchId({username: this.props.username})
    }
    this.renderTouchButton = (style) => {
      if (this.props.username) {
        return <ImageButton style={style.thumbprintButton}
          source={Assets.TOUCH}
          onPress={this.relaunchTouchId} />
      }
      return null
    }
  }
  componentDidMount () {
    if (this.props.username) {
      this.props.launchUserLoginWithTouchId({username: this.props.username})
    }
  }
  render () {
    const { PinLoginScreenStyle } = this.props.styles
    return (
      <View style={PinLoginScreenStyle.container}>
        <BackgroundImage
          src={Assets.LOGIN_BACKGROUND}
          style={PinLoginScreenStyle.backgroundImage}
          content={this.renderOverImage()}
          enableTouch={false}
        />
      </View>
    )
  }

  renderOverImage () {
    const { PinLoginScreenStyle } = this.props.styles
    if (this.props.loginSuccess) {
      /* return (
        <View style={PinLoginScreenStyle.featureBox}>
          <Text>LOGIN SUCCESS</Text>
        </View>
      ) */
      return null
    }
    return (
      <View style={PinLoginScreenStyle.featureBox}>
        <LogoImageHeader style={PinLoginScreenStyle.logoHeader} />
        <View style={PinLoginScreenStyle.featureBoxBody}>
          {this.renderBottomHalf(PinLoginScreenStyle)}
        </View>
        {this.renderTouchButton(PinLoginScreenStyle)}
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
            downStyle={style.usernameButton.downStyle}
            downTextStyle={style.usernameButton.downTextStyle}
            upStyle={style.usernameButton.upStyle}
            upTextStyle={style.usernameButton.upTextStyle}
          />
          <FourDigitInputConnector style={style.fourPin} />
          <Button
            onPress={this.exitPin.bind(this)}
            label={'EXIT PIN'}
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
    this.props.launchUserLoginWithTouchId({username: arg})
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
