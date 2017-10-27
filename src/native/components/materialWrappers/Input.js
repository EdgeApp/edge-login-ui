import React, { Component } from 'react'
import { TextField } from 'react-native-material-textfield'

class Input extends Component {
  /* static defaultProps = {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoFocus: false,
    forceFocus: false,
    returnKeyType: 'go',
    onFocus: null
  } */
  componentDidMount () {
    if (this.props.autoFocus) {
      this.textInput.focus()
    }
  }
  addRef (arg) {
    if (arg) {
      this.textInput = arg
    }
  }
  render () {
    const value = this.props.value ? this.props.value : ''
    const error = this.props.error ? this.props.error : ''
    const {
      containerStyle,
      baseColor,
      tintColor,
      textColor,
      errorColor,
      titleTextStyle,
      onChangeText,
      secureTextEntry,
      returnKeyType
    } = this.props
    return (
      <TextField
        ref={this.addRef.bind(this)}
        label={this.props.label}
        value={value}
        onChangeText={onChangeText}
        error={error}
        containerStyle={containerStyle}
        baseColor={baseColor}
        tintColor={tintColor}
        textColor={textColor}
        errorColor={errorColor}
        titleTextStyle={titleTextStyle}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
      />
    )
  }
  onSubmitEdit (event) {
    if (this.props.onFinish) {
      this.props.onFinish()
    }
  }
  onFocus () {
    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }
  onBlur () {
    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }
}

export { Input }
