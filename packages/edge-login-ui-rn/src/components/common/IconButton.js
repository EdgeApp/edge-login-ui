// @flow

import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'

type Props = {
  icon: React.Node,
  style: any,
  onPress: Function
}

type State = {
  pressed: boolean
}

class IconButton extends React.Component<Props, State> {
  constructor(props: Props) {
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

  render() {
    return (
      <TouchableOpacity
        style={this.props.style.container}
        onPress={this._onPressButton}
      >
        <View>{this.props.icon}</View>
      </TouchableOpacity>
    )
  }
}

export { IconButton }
