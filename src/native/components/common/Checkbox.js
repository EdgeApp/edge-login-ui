import React, { Component, PropTypes } from 'react'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'

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
        onOff: nextProps.defaultValue
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
        <View
          style={[style.container, this.state.onOff && style.containerSelected]}
        >
          {this.renderImage(style)}
          <View style={style.labelContainer}>
            <Text>{this.props.label} </Text>
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

Checkbox.propTypes = {
  style: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  checkedImage: PropTypes.number.isRequired,
  uncheckedImage: PropTypes.number.isRequired,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isSelected: PropTypes.bool
}

export { Checkbox }
