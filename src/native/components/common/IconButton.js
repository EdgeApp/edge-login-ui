// @flow

import React, { Component } from 'react'
import { TouchableHighlight, View } from 'react-native'

import { Icon } from './'

type Props = {
  icon: string,
  style: any,
  onPress: Function,
  iconType: string
}
type State = {
  pressed: boolean
}

class IconButton extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      pressed: false
    }
  }

  _onPressButton = () => {
    this.props.onPress()
  }
  _onShowUnderlay = () => {
    this.setState({
      pressed: true
    })
  }
  _onHideUnderlay = () => {
    this.setState({
      pressed: false
    })
  }
  renderIcon (icon: Object, iconPressed: Object, iconSize: number) {
    let style = icon
    if (this.state.pressed) {
      style = iconPressed
    }
    return (
      <Icon
        style={style}
        name={this.props.icon}
        size={iconSize}
        type={this.props.iconType}
      />
    )
  }

  render () {
    const {
      container,
      icon,
      iconPressed,
      iconSize,
      underlayColor
    } = this.props.style
    return (
      <TouchableHighlight
        style={container}
        onPress={this._onPressButton}
        onShowUnderlay={this._onShowUnderlay}
        onHideUnderlay={this._onHideUnderlay}
        underlayColor={underlayColor}
      >
        <View>{this.renderIcon(icon, iconPressed, iconSize)}</View>
      </TouchableHighlight>
    )
  }
}

export { IconButton }
