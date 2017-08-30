import React, { Component, PropTypes } from 'react'
// import * as Colors from '../../../common/constants/Colors'
import { View, Text } from 'react-native'
import { Input, ScrollingList } from './'
class FormFieldWithDropComponent extends Component {
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
      console.log('STYLE WRF T ')
      console.log(style.listView)
      return (
        <View style={style.searchContainer}>
          <ScrollingList
            style={style.listView}
            getListItemsFunction={this.props.getListItemsFunction}
            dataList={this.props.dataList}
          />
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

FormFieldWithDropComponent.propTypes = {
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
  returnKeyType: PropTypes.string,
  getListItemsFunction: PropTypes.func,
  dataList: PropTypes.array
}

FormFieldWithDropComponent.defaultProps = {
  autoCapitalize: 'none',
  autoCorrect: false,
  autoFocus: false,
  forceFocus: false,
  returnKeyType: 'go',
  onFocus: null
}

export { FormFieldWithDropComponent }
