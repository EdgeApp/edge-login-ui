import React, { Component } from 'react'
import { View, Text } from 'react-native'
import {TextAndIconButton} from '../common'
import * as Constants from '../../../common/constants/'

/* type Props = {
  username?: string,
  password?: string,
  pin: string.isRequired,
  passwordMessage?: string
} */
/* <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
{this.renderTop(Style)}
</TouchableWithoutFeedback> */
class AccountInfoComponent extends Component {
  componentWillMount () {
    this.setState({
      collapsed: true
    })
  }
  renderPasswordWarning (style) {
    if (!this.props.password) {
      return (
        <Text style={style.bottomWarningText}>
          You did not set your password. We strongly encourage you to create a password and backup your account as soon as possible. You can set a password in the Settings screen in the app.
        </Text>
      )
    }
    return null
  }
  renderAccountInfo (style) {
    if (!this.props.password) {
      return (
        <View style={style.bottomInfo}>
          <Text style={style.accountText}>
            {'Username ' + this.props.username}
          </Text>
          <Text style={style.accountText}>{'PIN ' + this.props.pin}</Text>
        </View>
      )
    }
    return (
      <View style={style.bottomInfo}>
        <Text style={style.accountText}>
          {'Username ' + this.props.username}
        </Text>
        <Text style={style.accountText}>
          {'Password ' + this.props.password}
        </Text>
        <Text style={style.accountText}>{'PIN ' + this.props.pin}</Text>
      </View>
    )
  }
  renderBottom (style) {
    if (!this.state.collapsed) {
      return (
        <View style={style.bottom}>
          {this.renderAccountInfo(style)}
          <View style={style.bottomWarning}>
            {this.renderPasswordWarning(style)}
          </View>
        </View>
      )
    }
    return <View style={style.bottom} />
  }
  renderTop (style) {
    const msg = this.state.collapsed ? 'Show account information' : 'Hide account information'
    return <View style={style.top}>
      <TextAndIconButton style={style.textIconButton}
        icon={Constants.CLOSE_ICON}
        iconType={Constants.MATERIAL_ICONS}
        onPress={this.onPress.bind(this)}
        title={msg} />
    </View>
  }
  onPress () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render () {
    const Style = this.props.style
    return (
      <View
        style={[
          Style.container,
          !this.state.collapsed && {
            ...Style.container,
            borderWidth: 1,
            borderColor: Constants.GRAY_3
          }
        ]}
      >
        {this.renderTop(Style)}
        {this.renderBottom(Style)}
      </View>
    )
  }
}

export { AccountInfoComponent }
