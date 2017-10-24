import React, { Component } from 'react'
import { TextInput } from 'react-native'

/* type Props = {
  style: any,
  value: string,
  placeholder: string,
  autoCorrect: boolean,
  autoCapitalize: string,
  secureTextEntry: boolean,
  isError: boolean,
  forceFocus: boolean,
  returnKeyType: string,
  onFinish(): void,
  onFocus(): void,
  onChangeText(): void
} */

class Input extends Component {
  static defaultProps = {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoFocus: false,
    forceFocus: false,
    returnKeyType: 'default'
  }

  componentWillMount () {
    this.setState({
      inputText: '',
      autoFocus: this.props.autoFocus
    })
  }
  componentDidMount () {
    if (this.props.autoFocus) {
      // set the focus to the thing
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
    return (
      <TextInput
        ref={this.addRef.bind(this)}
        secureTextEntry={this.props.secureTextEntry}
        placeholder={this.props.placeholder}
        autoCorrect={this.props.autoCorrect}
        autoCapitalize={this.props.autoCapitalize}
        value={this.state.inputText}
        style={this.props.style}
        onChangeText={this.onChange.bind(this)}
        autoFocus={this.state.autoFocus}
        returnKeyType={this.props.returnKeyType}
        onSubmitEditing={this.onSubmitEdit.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
      />
    )
  }
  addRef (arg) {
    if (arg) {
      this.textInput = arg
    }
  }

  onSubmitEdit (event) {
    if (this.props.onFinish) {
      this.props.onFinish()
    }
  }
  onChange (text) {
    this.setState({
      inputText: text
    })
    this.props.onChangeText(text)
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
