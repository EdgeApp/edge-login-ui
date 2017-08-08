import React, { Component, PropTypes } from 'react'
import { Text, TouchableHighlight } from 'react-native'
class Button extends Component {
  componentWillMount () {
    this.state = {
      isThinking: false,
      pressed: false
    }
  }
  render () {
    return (
      <TouchableHighlight
        style={[
          this.props.upStyle,
          this.state.pressed ? this.props.downStyle : {}
        ]}
        onPress={this.onPress.bind(this)}
        disabled={this.state.isThinking}
        onHideUnderlay={() => {
          this.setState({ pressed: false })
        }}
        onShowUnderlay={() => {
          this.setState({ pressed: true })
        }}
      >
        {this.renderInside()}
      </TouchableHighlight>
    )
  }
  renderInside () {
    if (!this.state.isThinking) {
      return (
        <Text style={this.props.upTextStyle}>
          {this.props.label}
        </Text>
      )
    }
    return (
      <Text style={this.props.upTextStyle}>
        THINKING
      </Text>
    )
  }
  onPress () {
    // this.props.onPress()
    if (this.props.doesThink) {
      this.setState({
        isThinking: true
      })
    }
  }
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  downStyle: PropTypes.object.isRequired,
  upStyle: PropTypes.object.isRequired,
  downTextStyle: PropTypes.object.isRequired,
  upTextStyle: PropTypes.object.isRequired,
  isThinking: PropTypes.bool,
  doesThink: PropTypes.bool // if doesThink is used, then isThinking is also required
}

export { Button }
