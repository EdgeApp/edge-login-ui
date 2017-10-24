import React, { Component } from 'react'
// import * as Colors from '../../../common/constants/Colors'
import { View, Text } from 'react-native'
import { Input } from './'

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
  getListItemsFunction(): void,
} */
class FormFieldWithDropComponent extends Component {
  static defaultProps = {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoFocus: false,
    forceFocus: false,
    returnKeyType: 'go',
    onFocus: null
  }

  componentWillMount () {
    const secure = this.props.secureTextEntry
      ? this.props.secureTextEntry
      : false
    this.setState({
      secure: secure,
      autoFocus: this.props.autoFocus,
      isFocused: this.props.forceFocus
    })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      isFocused: nextProps.forceFocus
    })
  }

  render () {
    let Style = this.props.style
    if (this.state.isFocused) {
      Style = this.props.style.selected
    }
    return (
      <View style={Style.container}>
        <View style={Style.labelContainer}>
          <Text style={Style.labelText}>
            {this.renderLabel()}
          </Text>
        </View>
        <View
          style={Style.imputContainer}
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
        {this.renderDropList(Style)}
      </View>
    )
  }
  renderDropList (style) {
    if (this.state.isFocused) {
      return (
        <View style={style.searchContainer}>
          {this.props.getListItemsFunction(style.listItem, this.props.dataList)}
        </View>
      )
    }
    return null
  }

  renderLabel () {
    return this.props.label
  }

  onSubmitEdit (event) {
    if (this.props.onFinish) {
      this.props.onFinish()
    }
  }
}

export { FormFieldWithDropComponent }
