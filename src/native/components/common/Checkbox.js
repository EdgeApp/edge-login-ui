import React, { Component } from 'react'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'

/* type Props = {
  style: any,
  label: string,
  checkedImage: number,
  uncheckedImage: number,
  value: boolean,
  disabled: boolean,
  isSelected: boolean,
  onChange(): void,
}
 */
class Checkbox extends Component {
  componentWillMount () {
    const onOff = this.props.value ? this.props.value : false
    this.setState({
      onOff: onOff
    })
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.disabled) {
      this.setState({
        onOff: nextProps.value
      })
    }
  }
  renderImage (style) {
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
    let onOff = this.state.onOff
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
