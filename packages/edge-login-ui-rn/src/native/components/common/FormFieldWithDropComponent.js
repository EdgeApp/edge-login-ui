import React, { Component } from 'react'
// import * as Colors from '../../../common/constants/Colors'
import { KeyboardAvoidingView } from 'react-native'
import { DropDownList } from './DropDownList'
import { Input } from '../materialWrappers/indexMaterial'

/* type Props = {
  dataList: Array,
  style: any,
  label: string,
  value: string,
  placeholder: string,
  autoCorrect: boolean,
  autoFocus: boolean,
  forceFocus: boolean,
  autoCapitalize: string,
  secureTextEntry: boolean,
  showSecureCheckbox: boolean,
  returnKeyType: string,
  error: string,
  onFinish(): void,
  onFocus(): void,
  onChangeText(): void,
  renderListRow(): void,
} */
class FormFieldWithDropComponent extends Component {
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
      autoFocus: this.props.autoFocus,
      isFocused: this.props.isFocused
    })
    this.onSubmitEditing = event => {
      if (this.props.onSubmitEditing) {
        this.props.onSubmitEditing()
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      isFocused: nextProps.isFocused
    })
  }

  render () {
    const Style = this.props.style

    /* return (
      <View style={Style.container}>
        {this.renderInput(Style.materialInput)}
        {this.renderDropList(Style)}
      </View>
    ) */
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
  renderInput (style) {
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
  renderDropList (style) {
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
