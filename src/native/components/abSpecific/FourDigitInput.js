import React, { Component, PropTypes } from 'react'
import { View, TextInput } from 'react-native'

class FourDigitInput extends Component {
  render () {
    const Style = this.props.style
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
    console.log('Update Pin')
    console.log(arg)
    this.props.onChangeText({ name: 'FUN THING' })
  }
}
FourDigitInput.propTypes = {
  style: PropTypes.object.isRequired
}

export { FourDigitInput }
