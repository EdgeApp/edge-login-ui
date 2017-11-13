import React, { Component } from 'react'
// import * as Constants from '../../../common/constants'
import { Input } from '../materialWrappers/indexMaterial'
/* import { Checkbox } from './Checkbox'
import { STANDARD_CHECKED, STANDARD_UNCHECKED } from '../../../native/assets'
 */
/* type Props = {

  style: object.isRequired,
  label: string.isRequired,
  value?: string,
  placeholder?: string,
  autoCorrect: boolean,
  autoFocus: boolean,
  forceFocus: boolean,
  autoCapitalize?: string,
  secureTextEntry: boolean,
  showSecureCheckbox: boolean,
  returnKeyType?: string,
  error?: string,
  onFinish():void,
  onFocus():void,
  onChangeText():void,
  onSubmitEditing():void
} */

class FormField extends Component {
  /* static defaultProps = {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoFocus: false,
    forceFocus: false,
    returnKeyType: 'go',
    onFocus: null
  } */
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
    const {
      container,
      baseColor,
      tintColor,
      textColor,
      errorColor,
      titleTextStyle

    } = this.props.style
    return (
      <Input
        label={this.props.label}
        value={this.props.value}
        onChangeText={this.props.onChangeText}
        error={this.props.error}
        containerStyle={container}
        secureTextEntry={this.state.secure}
        returnKeyType={this.props.returnKeyType}
        baseColor={baseColor}
        tintColor={tintColor}
        textColor={textColor}
        errorColor={errorColor}
        titleTextStyle={titleTextStyle}
        autoFocus={this.state.autoFocus}
        forceFocus={this.props.forceFocus}
        onFocus={this.props.onFocus}
        autoCapitalize={'none'}
        onSubmitEditing={this.onSubmitEditing.bind(this)}
        />
    )
  }
  /* renderHelperBox (Style) {
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
  } */
  /* setSecurity (arg) {
    this.setState({
      secure: arg
    })
  } */
  onSubmitEditing (event) {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing()
    }
  }
}

export { FormField }
