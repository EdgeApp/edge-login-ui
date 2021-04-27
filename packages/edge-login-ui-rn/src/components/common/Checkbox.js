// @flow

import * as React from 'react'
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native'

type Props = {
  testID?: string,
  style: any,
  label: string,
  checkedImage: string,
  uncheckedImage: string,
  value?: boolean,
  disabled?: boolean,
  onChange(boolean): void
}

type State = {
  onOff: boolean
}
class Checkbox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      onOff: this.props.value ? this.props.value : false
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (this.props.disabled) {
      this.setState({
        onOff: nextProps.value
      })
    }
  }

  renderImage() {
    const { style } = this.props
    if (this.state.onOff) {
      return (
        <View style={style.checkbox}>
          <Image source={this.props.checkedImage} />
        </View>
      )
    }
    return (
      <View style={style.checkbox}>
        <Image source={this.props.uncheckedImage} />
      </View>
    )
  }

  render() {
    const { style } = this.props
    return (
      <TouchableWithoutFeedback
        testID={this.props.testID}
        onPress={this.handlePress}
        disabled={this.props.disabled}
      >
        <View style={style.container}>
          {this.renderImage()}
          <View style={style.labelContainer}>
            <Text style={style.text}>{this.props.label} </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  handlePress = () => {
    const onOff = this.state.onOff
    let newOnOff = false
    if (!onOff) {
      newOnOff = true
    }
    this.setState({
      onOff: newOnOff
    })
    this.props.onChange(this.state.onOff)
  }
}

export { Checkbox }
