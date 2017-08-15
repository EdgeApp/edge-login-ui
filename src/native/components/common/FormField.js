import React, { Component, PropTypes } from 'react'
import * as Colors from '../../../common/constants/Colors'
import { View, Text } from 'react-native'
import { Input } from './Input'
import { Checkbox } from './Checkbox'

class FormField extends Component {
  componentWillMount () {
    const secure = this.props.secureTextEntry
      ? this.props.secureTextEntry
      : false
    this.setState({
      secure: secure
    })
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
            secureTextEntry={this.state.secure}
          />
        </View>
        {this.renderErrorContainer(Style)}
      </View>
    )
  }
  renderErrorContainer (Style) {
    if (!this.props.showSecureCheckbox) {
      return (
        <View style={Style.errorContainer}>
          <Text style={Style.errorText}>{this.renderError()}</Text>
        </View>
      )
    }
    return (
      <View style={Style.errorContainer}>
        <View style={Style.errorContainerLeft}>
          <Text style={Style.errorText}>{this.renderError()}</Text>
        </View>
        <View style={Style.errorContainerRight}>
          {this.renderHelperBox(Style)}
        </View>
      </View>
    )
  }
  renderHelperBox (Style) {
    if (this.props.showSecureCheckbox) {
      return (
        <Checkbox
          style={Style.helperCheckbox}
          onChange={this.setSecurity.bind(this)}
          label={this.props.showSecureCheckboxLabel}
        />
      )
    }
    return null
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
  setSecurity (arg) {
    this.setState({
      secure: arg
    })
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
  showSecureCheckbox: PropTypes.bool,
  error: PropTypes.string
}

export { FormField }
