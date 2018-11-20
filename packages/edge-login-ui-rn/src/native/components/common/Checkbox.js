// @flow

import React, { Component } from 'react'
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native'

type Props = {
  style: any,
  label: string,
  checkedImage: string,
  uncheckedImage: string,
  value: boolean,
  disabled: boolean,
  isSelected: boolean,
  onChange(boolean): void
}

type State = {
  onOff: boolean
}
class Checkbox extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      onOff: this.props.value ? this.props.value : false
    }
  }
  componentWillReceiveProps (nextProps: Props) {
    if (this.props.disabled) {
      this.setState({
        onOff: nextProps.value
      })
    }
  }
  renderImage (style: Object) {
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
  render () {
    const style = this.props.style
    return (
      <TouchableWithoutFeedback
        onPress={this.onPress.bind(this)}
        disabled={this.props.disabled}
      >
        <View style={style.container}>
          {this.renderImage(style)}
          <View style={style.labelContainer}>
            <Text style={style.text}>{this.props.label} </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  onPress () {
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
