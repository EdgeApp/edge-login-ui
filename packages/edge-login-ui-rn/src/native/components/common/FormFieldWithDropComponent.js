// @flow

import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import { Input } from '../materialWrappers/indexMaterial'
import { DropDownList } from './DropDownList'

type Props = {
  data: any,
  style: any,
  label: string,
  value: string,
  placeholder: string,
  autoCorrect: boolean,
  autoFocus: boolean,
  isFocused: boolean,
  forceFocus: boolean,
  autoCapitalize: string,
  secureTextEntry: boolean,
  returnKeyType: string,
  error: string,
  onFocus(): void,
  onBlur(): void,
  onChangeText(): void,
  renderRow(): void,
  onSubmitEditing(): void
}
type State = {
  secure: boolean,
  autoFocus: boolean,
  isFocused: boolean
}

class FormFieldWithDropComponent extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      secure: this.props.secureTextEntry ? this.props.secureTextEntry : false,
      autoFocus: this.props.autoFocus,
      isFocused: this.props.isFocused
    }
  }
  componentWillReceiveProps (nextProps: Props) {
    this.setState({
      isFocused: nextProps.isFocused
    })
  }
  onSubmitEditing = (event: any) => {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing()
    }
  }

  handleSelectListItem = () => {}

  render () {
    const Style = this.props.style
    return (
      <KeyboardAvoidingView
        style={Style.container}
        contentContainerStyle={Style.container}
        behavior={'position'}
        keyboardVerticalOffset={40}
      >
        {this.renderInput(Style.materialInput)}
        {this.renderDropList(Style)}
      </KeyboardAvoidingView>
    )
  }
  renderInput (style: Object) {
    const {
      container,
      baseColor,
      tintColor,
      textColor,
      errorColor,
      titleTextStyle
    } = style
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
        autoCorrect={this.props.autoCorrect}
        forceFocus={this.props.forceFocus}
        onFocus={this.props.onFocus}
        onBlur={() => {
          console.log('catch and release ')
        }}
        autoCapitalize={'none'}
        onSubmitEditing={this.onSubmitEditing}
      />
    )
  }
  renderDropList (style: Object) {
    if (this.state.isFocused) {
      return (
        <DropDownList
          style={style.searchContainer}
          data={this.props.data}
          onPress={this.handleSelectListItem}
          renderRow={this.props.renderRow}
        />
      )
    }
    return null
  }
}

export { FormFieldWithDropComponent }
