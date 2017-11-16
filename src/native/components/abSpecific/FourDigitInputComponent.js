import React, { Component } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native'
import { Spinner } from '../common'

/* type Props = {
  style: any,
  autoLogIn: boolean
} */

class FourDigitInputComponent extends Component {

  componentWillMount () {
    this.setState({
      autoFocus: true,
      touchId: false
    })
    this.loadedInput = (ref) => {
      if (ref) {
        console.log('I have loaded ')
        console.log('I have loaded ')
        console.log('I have loaded ')
        console.log('I have loaded ')
        console.log('I have loaded ')
        this.inputRef = ref
        this.inputRef.focus()
      }
    }
  }
  componentDidMount () {
    if (this.inputRef) {
      this.inputRef.focus()
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.isLogginginWithPin) {
      this.setState({
        touchId: true
      })
    }
  }
  render () {
    const Style = this.props.style
    return (
      <TouchableWithoutFeedback onPress={this.refocus.bind(this)}>
        <View style={Style.container}>
          <View style={Style.interactiveContainer}>
            {this.renderDotContainer(Style)}
            <TextInput
              ref={this.loadedInput}
              style={Style.input}
              onChangeText={this.updatePin.bind(this)}
              maxLength={4}
              keyboardType='numeric'
              value={this.props.pin}
              autoFocus
            />
          </View>
          <View style={Style.errorContainer}>
            <Text style={Style.errorText}>{this.props.error}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  refocus () {
    this.setState({
      autoFocus: true
    })
  }
  renderDotContainer (style) {
    const pinLength = this.props.pin ? this.props.pin.length : 0
    if ((pinLength === 4 || this.state.touchId) && this.props.autoLogIn) {
      return <Spinner />
    }
    return (
      <View style={style.dotContainer}>
        <View style={[style.circle, pinLength > 0 && style.circleSected]} />
        <View style={[style.circle, pinLength > 1 && style.circleSected]} />
        <View style={[style.circle, pinLength > 2 && style.circleSected]} />
        <View style={[style.circle, pinLength > 3 && style.circleSected]} />
      </View>
    )
  }
  updatePin (arg) {
    this.props.onChangeText({ username: this.props.username, pin: arg })
  }
}

export { FourDigitInputComponent }
