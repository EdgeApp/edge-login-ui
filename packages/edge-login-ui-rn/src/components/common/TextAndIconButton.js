// @flow

import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type Props = {
  testID?: string,
  icon: React.Node,
  style: any,
  onPress: Function,
  title: string,
  numberOfLines?: number
}

type State = {
  pressed: boolean
}

class TextAndIconButton extends React.Component<Props, State> {
  numberOfLines: number
  constructor(props: Props) {
    super(props)
    this.numberOfLines = this.props.numberOfLines || 1
  }

  render() {
    const {
      container,
      centeredContent,
      inner,
      textContainer,
      iconContainer,
      text
    } = this.props.style
    return (
      <TouchableOpacity
        testID={this.props.testID}
        style={container}
        onPress={this.props.onPress}
      >
        <View style={centeredContent}>
          <View style={inner}>
            <View style={textContainer}>
              <Text
                style={text}
                ellipsizeMode="middle"
                numberOfLines={this.numberOfLines}
              >
                {this.props.title + ' '}
              </Text>
            </View>
            <View style={iconContainer}>{this.props.icon}</View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export { TextAndIconButton }
