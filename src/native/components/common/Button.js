import React, { Component } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

import { Spinner } from './Spinner'

type Props = {
  label: string,
  downStyle: Object,
  upStyle: Object,
  downTextStyle: Object,
  upTextStyle: Object,
  isThinking: boolean,
  doesThink: boolean,
  onPress(): void // if doesThink is used, then isThinking is also required
}

type State = {
  isThinking: boolean,
  pressed: boolean
}

class Button extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      isThinking: false,
      pressed: false
    }
  }
  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.isThinking !== this.state.isThinking) {
      this.setState({
        isThinking: nextProps.isThinking
      })
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
        disabled={this.props.isThinking}
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
    if (!this.props.isThinking) {
      return (
        <Text
          style={[
            this.props.upTextStyle,
            this.state.pressed && this.props.downTextStyle
          ]}
        >
          {this.props.label}
        </Text>
      )
    }
    return (
      <View>
        <Spinner />
      </View>
    )
  }
  onPress () {
    this.props.onPress()
    if (this.props.doesThink) {
      this.setState({
        isThinking: true
      })
    }
  }
}

export { Button }
