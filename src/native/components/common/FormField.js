// @flow

import React, { Component } from 'react'

import { Input } from '../materialWrappers/indexMaterial'

type Props = {
  style: Object,
  label: string,
  value: string,
  placeholder?: string,
  autoCorrect: boolean,
  autoFocus: boolean,
  forceFocus: boolean,
  autoCapitalize?: string,
  secureTextEntry: boolean,
  showSecureCheckbox: boolean,
  returnKeyType: string,
  error?: string,
  onFinish(): void,
  onFocus(): void,
  onBlur(): void,
  onChangeText(): void,
  onSubmitEditing(): void
}

type State = {
  secure: boolean,
  autoFocus: boolean
}

class FormField extends Component<Props, State> {
  static defaultProps = {
    value: '',
    returnKeyType: 'done'
  }
  constructor (props: Props) {
    super(props)
    this.state = {
      secure: this.props.secureTextEntry ? this.props.secureTextEntry : false,
      autoFocus: this.props.autoFocus
    }
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
        onBlur={this.props.onBlur}
        autoCapitalize={'none'}
        autoCorrect={this.props.autoCorrect}
        onSubmitEditing={this.onSubmitEditing}
      />
    )
  }
  onSubmitEditing = (event: any) => {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing()
    }
  }
}

export { FormField }
