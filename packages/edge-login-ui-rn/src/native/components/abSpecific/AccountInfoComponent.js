// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TextAndIconButton } from '../common'
import * as Constants from '../../../common/constants/'

export type StateProps = {
  username?: string,
  password?: string,
  pin: string,
  passwordMessage?: string
}
export type OwnProps = {
  style: Object
}
type State = {
  collapsed: boolean
}

type Props = OwnProps & StateProps

class AccountInfoComponent extends Component<Props, State> {
  componentWillMount () {
    this.setState({
      collapsed: true
    })
  }
  renderPasswordWarning (style: Object) {
    if (!this.props.password) {
      return (
        <View style={style.bottomWarning}>
          <Text style={style.bottomWarningText}>
            You did not set your password. We strongly encourage you to create a
            password and backup your account as soon as possible. You can set a
            password in the Settings screen in the app.
          </Text>
          <View style={style.shim} />
        </View>
      )
    }
    return null
  }
  renderAccountInfo (style: Object) {
    if (!this.props.password) {
      return (
        <View
          style={[
            style.bottomInfo,
            !this.props.password && {
              ...style.bottomInfo,
              borderBottomColor: Constants.TRANSPARENT
            }
          ]}
        >
          <View style={style.shim} />
          <View style={style.bRow}>
            <View style={style.bInfoLeft} />
            <View style={style.bInfoCenter}>
              <Text style={style.accountText}>Username:</Text>
            </View>
            <View style={style.bInforRight}>
              <Text style={style.accountText}>{this.props.username}</Text>
            </View>
          </View>
          <View style={style.bRow}>
            <View style={style.bInfoLeft} />
            <View style={style.bInfoCenter}>
              <Text style={style.accountText}>PIN:</Text>
            </View>
            <View style={style.bInforRight}>
              <Text style={style.accountText}>{this.props.pin}</Text>
            </View>
          </View>
          <View style={style.shim} />
        </View>
      )
    }
    return (
      <View style={style.bottomInfo}>
        <View style={style.shim} />
        <View style={style.bRow}>
          <View style={style.bInfoLeft} />
          <View style={style.bInfoCenter}>
            <Text style={style.accountText}>Username:</Text>
          </View>
          <View style={style.bInforRight}>
            <Text style={style.accountText}>{this.props.username}</Text>
          </View>
        </View>
        <View style={style.bRow}>
          <View style={style.bInfoLeft} />
          <View style={style.bInfoCenter}>
            <Text style={style.accountText}>Password:</Text>
          </View>
          <View style={style.bInforRight}>
            <Text style={style.accountText}>{this.props.password}</Text>
          </View>
        </View>
        <View style={style.bRow}>
          <View style={style.bInfoLeft} />
          <View style={style.bInfoCenter}>
            <Text style={style.accountText}>PIN:</Text>
          </View>
          <View style={style.bInforRight}>
            <Text style={style.accountText}>{this.props.pin}</Text>
          </View>
        </View>
        <View style={style.shim} />
      </View>
    )
  }
  renderBottom (style: Object) {
    if (!this.state.collapsed) {
      return (
        <View style={style.bottom}>
          {this.renderAccountInfo(style)}
          {this.renderPasswordWarning(style)}
        </View>
      )
    }
    return <View style={style.bottom} />
  }
  renderTop (style: Object) {
    const msg = this.state.collapsed
      ? 'Show account information'
      : 'Hide account information'
    const icon = this.state.collapsed
      ? Constants.KEYBOARD_ARROW_DOWN
      : Constants.KEYBOARD_ARROW_UP
    return (
      <View style={style.top}>
        <TextAndIconButton
          style={style.textIconButton}
          icon={icon}
          iconType={Constants.MATERIAL_ICONS}
          onPress={this.onPress}
          title={msg}
        />
      </View>
    )
  }
  onPress = () => {
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
            borderWidth: 0,
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
