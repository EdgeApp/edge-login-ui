import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'

class DropInput extends Component {
  render () {
    const Style = this.props.style
    return <View style={Style.container} />
  }
}
DropInput.propTypes = {
  style: PropTypes.object.isRequired
}

export { DropInput }
