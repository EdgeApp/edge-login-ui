import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import * as Colors from '../../../common/constants/Colors'
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
    let msg = 'Hide account information'
    if (this.state.collapsed) {
      msg = 'Show account information'
    }
    return <View style={style.top}><Text>{msg}</Text></View>
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
            borderColor: Colors.GRAY_3
          }
        ]}
      >
        <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
          {this.renderTop(Style)}
        </TouchableWithoutFeedback>
        {this.renderBottom(Style)}
      </View>
    )
  }
}

AccountInfoComponent.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  pin: PropTypes.string.isRequired,
  passwordMessage: PropTypes.string
}

export { AccountInfoComponent }
