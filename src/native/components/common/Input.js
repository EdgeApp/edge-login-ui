import React, { Component, PropTypes } from 'react'
import { TextInput } from 'react-native'

class Input extends Component {
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
        inputText: nextProps.value
      })
    }
  }

  render () {
    return (
      <TextInput
        secureTextEntry={this.props.secureTextEntry}
        placeholder={this.props.placeholder}
        autoCorrect={this.props.autoCorrect}
        autoCapitalize={this.props.autoCapitalize}
        value={this.state.inputText}
        style={this.props.style}
        onChangeText={this.onChange.bind(this)}
        autoFocus={this.state.autoFocus}
      />
    )
  }
  onChange (text) {
    this.setState({
      inputText: text
    })
    this.props.onChangeText(text)
  }
}

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  isError: PropTypes.bool
}

Input.defaultProps = {
  autoCapitalize: 'none',
  autoCorrect: false,
  autoFocus: false
}

export { Input }
