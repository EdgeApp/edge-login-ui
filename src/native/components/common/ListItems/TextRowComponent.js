// @flow

import React, { Component } from 'react'
import { Text, TouchableHighlight } from 'react-native'

export type OwnProps = {
  style: Object,
  numberOfLines: number,
  title: string,
  data: any
}
export type DispatchProps = {
  onPress(any): void
}

type State = {
  pressed: boolean
}

type Props = OwnProps & DispatchProps
class TextRowComponent extends Component<Props, State> {
  numberOfLines: number
  constructor (props: Props) {
    super(props)
    this.state = {
      pressed: false
    }
    this.numberOfLines = this.props.numberOfLines || 1
  }
  _onPressButton = () => {
    this.props.onPress(this.props.data)
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

  render () {
    const { container, text, textPressed, underlayColor } = this.props.style
    return (
      <TouchableHighlight
        style={container}
        onPress={this._onPressButton}
        onShowUnderlay={this._onShowUnderlay}
        onHideUnderlay={this._onHideUnderlay}
        underlayColor={underlayColor}
      >
        <Text
          style={[text, this.state.pressed && textPressed]}
          ellipsizeMode={'middle'}
          numberOfLines={this.numberOfLines}
        >
          {this.props.title}
        </Text>
      </TouchableHighlight>
    )
  }
}

export { TextRowComponent }
