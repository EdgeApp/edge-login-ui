import React, { Component, PropTypes } from 'react'
import * as Colors from '../../../common/constants/Colors'
import { View, Text } from 'react-native'
import { Input } from './Input'

class FormField extends Component {
  componentWillReceiveProps (nextProps) {
    console.log('GOt new props')
    console.log(nextProps)
  }
  render () {
    const Style = this.props.style
    return (
      <View style={Style.container}>
        <View style={Style.labelContainer}>
          <Text
            style={[
              Style.labelText,
              this.props.error ? Style.errorText : Style.labelText
            ]}
          >
            {this.renderLabel()}
          </Text>
        </View>
        <View
          style={[
            Style.imputContainer,
            this.props.error ? { borderBottomColor: Colors.ACCENT_RED } : {}
          ]}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        >
          <Input
            style={Style.inputStyle}
            onChangeText={this.props.onChangeText}
            value={this.props.value}
            autoCapitalize={'none'}
          />
        </View>
        <View style={Style.errorContainer}>
          <Text style={Style.errorText}>{this.renderError()}</Text>
        </View>
      </View>
    )
  }
  renderLabel () {
    return this.props.label
  }
  renderError () {
    if (this.props.error) {
      return this.props.error
    }
    return null
  }
}

FormField.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  error: PropTypes.string
}

export { FormField }
