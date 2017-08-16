import React, { Component, PropTypes } from 'react'
import { View, TextInput } from 'react-native'

class FourDigitInputComponent extends Component {
  render () {
    const Style = this.props.style
    console.log('KKKKKKKKKKKKKKK')
    console.log(this.props.username)
    return (
      <View style={Style.container}>
        <TextInput
          style={Style.input}
          onChangeText={this.updatePin.bind(this)}
          maxLength={4}
          keyboardType={'numeric'}
        />
      </View>
    )
  }
  updatePin (arg) {
    if (arg.length === 4) {
      // trap here to not continue until we get an update.
    }
    this.props.onChangeText({ username: this.props.username, pin: arg })
  }
}
FourDigitInputComponent.propTypes = {
  style: PropTypes.object.isRequired
}

export { FourDigitInputComponent }
