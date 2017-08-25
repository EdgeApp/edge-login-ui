import React, { Component } from 'react'
import { View, Modal } from 'react-native'

class CustomModal extends Component {
  render () {
    const Style = this.props.style
    return (
      <Modal style={Style.modal} animationType={'slide'} transparent visible>
        <View style={Style.container}>
          {this.props.children}
        </View>
      </Modal>
    )
  }
}

export { CustomModal }
