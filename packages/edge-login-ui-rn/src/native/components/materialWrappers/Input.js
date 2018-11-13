// @flow

import React, { Component } from 'react'
import { TextField } from 'react-native-material-textfield'

import { InputStyles } from '../../../common/styles/common/InputStyles.js'

type Props = {
  label: string,
  value: string,
  containerStyle: Object,
  baseColor: string,
  tintColor: string,
  textColor: string,
  errorColor: string,
  titleTextStyle: Object,
  secureTextEntry: boolean,
  autoCapitalize: string,
  autoCorrect: boolean,
  autoFocus: boolean,
  forceFocus: boolean,
  returnKeyType: string,
  onFocus(): void,
  onBlur(): void,
  onChangeText(string): void,
  onSubmitEditing(): void
}
type State = {
  inputText: string,
  autoFocus: boolean
}
class Input extends Component<Props, State> {
  textInput: TextField

  constructor (props: Props) {
    super(props)
    this.state = {
      inputText: '',
      autoFocus: this.props.autoFocus
    }
  }
  componentDidMount () {
    if (this.props.autoFocus) {
      this.textInput.focus()
    }
  }

  componentWillReceiveProps (nextProps: Props) {
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
    const autoCorrectConfigured =
      typeof this.props.autoCorrect === 'undefined'
        ? true
        : this.props.autoCorrect
    return (
      <TextField
        ref={this.addRef}
        label={this.props.label}
        value={value}
        onChangeText={this.onChange}
        error={error}
        containerStyle={containerStyle}
        baseColor={baseColor}
        tintColor={tintColor}
        textColor={textColor}
        errorColor={errorColor}
        titleTextStyle={titleTextStyle}
        secureTextEntry={secureTextEntry}
        autoCapitalize={this.props.autoCapitalize}
        returnKeyType={returnKeyType}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        autoCorrect={autoCorrectConfigured}
        onSubmitEditing={this.onSubmitEditing}
        fontSize={InputStyles.fontSize}
        titleFontSize={InputStyles.titleFontSize}
        labelFontSize={InputStyles.labelFontSize}
      />
    )
  }

  addRef = (arg: TextField) => {
    if (arg) {
      this.textInput = arg
    }
  }

  onChange = (text: string) => {
    this.setState({
      inputText: text
    })
    this.props.onChangeText(text)
  }

  onSubmitEditing = (event: any) => {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing()
    }
  }
  onFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }
  onBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }
}

export { Input }
