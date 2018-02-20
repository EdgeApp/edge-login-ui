import React, { Component } from 'react'
import { Text, TouchableHighlight } from 'react-native'

class TextRowComponent extends Component {
  componentWillMount () {
    this.setState({
      pressed: false
    })
    this.numberOfLines = this.props.numberOfLines || 1
  }
  _onPressButton () {
    this.props.onPress(this.props.data)
  }
  _onShowUnderlay () {
    this.setState({
      pressed: true
    })
  }
  _onHideUnderlay () {
    this.setState({
      pressed: false
    })
  }

  render () {
    const { container, text, textPressed, underlayColor } = this.props.style
    return (
      <TouchableHighlight
        style={container}
        onPress={this._onPressButton.bind(this)}
        onShowUnderlay={this._onShowUnderlay.bind(this)}
        onHideUnderlay={this._onHideUnderlay.bind(this)}
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
