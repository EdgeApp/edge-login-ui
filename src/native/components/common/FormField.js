import React, { Component, PropTypes } from 'react'
import * as Colors from '../../../common/constants/Colors'
import { View, Text } from 'react-native'
import { Input } from './Input'
import { Checkbox } from './Checkbox'
import { STANDARD_CHECKED, STANDARD_UNCHECKED } from '../../../native/assets'

class FormField extends Component {
  componentWillMount () {
    const secure = this.props.secureTextEntry
      ? this.props.secureTextEntry
      : false
    this.setState({
      secure: secure,
      autoFocus: this.props.autoFocus
    })
  }
  render () {
    const Style = this.props.style
    if (this.props.label === 'Confirm Password') {
      console.log('WE ARE THE CONFIRM _Autofocuse__ ' + this.state.autoFocus)
    }
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
            onFinish={this.props.onFinish}
            returnKeyType={this.props.returnKeyType}
            onSubmitEditing={this.onSubmitEdit.bind(this)}
            autoFocus={this.state.autoFocus}
            forceFocus={this.props.forceFocus}
            onFocus={this.props.onFocus}
            label={this.props.label}
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
          checkedImage={STANDARD_CHECKED}
          uncheckedImage={STANDARD_UNCHECKED}
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
  onSubmitEdit (event) {
    if (this.props.onFinish) {
      this.props.onFinish()
    }
  }
}

FormField.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoFocus: PropTypes.bool,
  forceFocus: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  showSecureCheckbox: PropTypes.bool,
  error: PropTypes.string,
  onFinish: PropTypes.func,
  onFocus: PropTypes.func,
  returnKeyType: PropTypes.string
}

FormField.defaultProps = {
  autoCapitalize: 'none',
  autoCorrect: false,
  autoFocus: false,
  forceFocus: false,
  returnKeyType: 'go',
  onFocus: null
}

export { FormField }
