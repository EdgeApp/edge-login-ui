// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'

import { FullScreenModalStyle } from '../../../common/styles/'

type Props = {
  children: any
}

class FullScreenModal extends Component<Props> {
  render () {
    const styles = FullScreenModalStyle
    return (
      <Modal
        style={styles.container}
        animationType={'slide'}
        transparent
        visible
      >
        <View style={styles.modalBox}>{this.props.children}</View>
      </Modal>
    )
  }
}

export { FullScreenModal }
