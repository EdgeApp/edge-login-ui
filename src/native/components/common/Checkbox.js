import React, { Component, PropTypes } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

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
  render () {
    const style = this.props.style
    return (
      <TouchableOpacity
        onPress={this.onPress.bind(this)}
        disabled={this.props.disabled}
        style={[style.container, this.state.onOff && style.containerSelected]}
      >
        <View style={style.boxContainer} />
        <View style={style.labelContainer}>
          <Text>{this.props.label} </Text>
        </View>
      </TouchableOpacity>
    )
  }
  onPress () {
    console.log('FUCK PRESSED ')
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
  value: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isSelected: PropTypes.bool
}

export { Checkbox }
