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
  componentWillMount () {
    this.setState({
      inputText: '',
      autoFocus: this.props.autoFocus
    })
  }
  componentDidMount () {
    if (this.props.autoFocus) {
      this.textInput.focus()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.inputText) {
      this.setState({
        inputText: nextProps.value,
        autoFocus: nextProps.autoFocus
      })
    }
    if (nextProps.autoFocus && !this.props.autoFocus) {
      this.textInput.focus()
    }
    if (nextProps.forceFocus) {
      this.textInput.focus()
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
      secureTextEntry,
      returnKeyType
    } = this.props
    return (
      <TextField
        ref={this.addRef.bind(this)}
        label={this.props.label}
        value={value}
        onChangeText={this.onChange.bind(this)}
        error={error}
        containerStyle={containerStyle}
        baseColor={baseColor}
        tintColor={tintColor}
        textColor={textColor}
        errorColor={errorColor}
        titleTextStyle={titleTextStyle}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
        onSubmitEditing={this.onSubmitEdit.bind(this)}
      />
    )
  }

  addRef (arg) {
    if (arg) {
      this.textInput = arg
    }
  }

  onChange (text) {
    this.setState({
      inputText: text
    })
    this.props.onChangeText(text)
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
