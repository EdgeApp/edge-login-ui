// @flow

import React, { Component } from 'react'
import { Modal, View } from 'react-native'

type Props = {
  style: Object,
  children: any
}

class CustomModal extends Component<Props> {
  render () {
    const Style = this.props.style
    return (
      <Modal style={Style.modal} animationType={'slide'} transparent visible>
        <View style={Style.container}>{this.props.children}</View>
      </Modal>
    )
  }
}

export { CustomModal }
