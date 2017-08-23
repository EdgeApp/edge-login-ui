import React, { Component, PropTypes } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native'
import { Spinner } from '../common'

class FourDigitInputComponent extends Component {
  componentWillMount () {
    this.setState({
      autoFocus: true
    })
  }
  render () {
    const Style = this.props.style
    return (
      <TouchableWithoutFeedback onPress={this.refocus.bind(this)}>
        <View style={Style.container}>
          <View style={Style.interactiveContainer}>
            {this.renderDotContainer(Style)}
            <TextInput
              style={Style.input}
              onChangeText={this.updatePin.bind(this)}
              maxLength={4}
              keyboardType='numeric'
              value={this.props.pin}
              autoFocus={this.state.autoFocus}
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
    if (pinLength === 4 && this.props.autoLogIn) {
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
FourDigitInputComponent.propTypes = {
  style: PropTypes.object.isRequired,
  autoLogIn: PropTypes.bool
}

export { FourDigitInputComponent }
