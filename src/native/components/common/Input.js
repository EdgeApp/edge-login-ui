// @flow

import React, { Component } from 'react'
import { TextInput } from 'react-native'

type Props = {
  style: any,
  value: string,
  placeholder: string,
  autoCorrect: boolean,
  autoFocus: boolean,
  autoCapitalize: string,
  secureTextEntry: boolean,
  isError: boolean,
  forceFocus: boolean,
  returnKeyType: string,
  onFinish(): void,
  onBlur(): void,
  onFocus(): void,
  onChangeText(string): void
}

type State = {
  inputText: string,
  autoFocus: boolean
}

class Input extends Component<Props, State> {
  textInput: TextInput
  constructor (props: Props) {
    super(props)
    this.state = {
      inputText: '',
      autoFocus: this.props.autoFocus
    }
  }
  componentDidMount () {
    if (this.props.autoFocus) {
      // set the focus to the thing
      console.log('SHOUDL AUTOFOCUS ')
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
    return (
      <TextInput
        ref={this.addRef}
        secureTextEntry={this.props.secureTextEntry}
        placeholder={this.props.placeholder}
        autoCorrect={this.props.autoCorrect}
        autoCapitalize={this.props.autoCapitalize}
        value={this.state.inputText}
        style={this.props.style}
        onChangeText={this.onChange}
        autoFocus={this.state.autoFocus}
        returnKeyType={this.props.returnKeyType}
        onSubmitEditing={this.onSubmitEdit}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    )
  }
  addRef = (arg: TextInput) => {
    if (arg) {
      this.textInput = arg
    }
  }

  onSubmitEdit = (event: any) => {
    if (this.props.onFinish) {
      this.props.onFinish()
    }
  }
  onChange = (text: string) => {
    this.setState({
      inputText: text
    })
    this.props.onChangeText(text)
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
