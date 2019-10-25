// @flow

import React, { Component } from 'react'
import { Dimensions, Platform, View } from 'react-native'
import Modal from 'react-native-modal'

import { FullScreenModalStyle } from '../../../common/styles/'

type Props = {
  children: any
}

class FullScreenModal extends Component<Props> {
  render() {
    const styles = FullScreenModalStyle

    const deviceWidth = Dimensions.get('window').width
    const deviceHeight =
      Platform.OS === 'ios'
        ? Dimensions.get('window').height
        : require('react-native-extra-dimensions-android').get(
            'REAL_WINDOW_HEIGHT'
          )

    return (
      <Modal
        animationType="slide"
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        style={styles.container}
        transparent
        visible
      >
        <View style={styles.modalBox}>{this.props.children}</View>
      </Modal>
    )
  }
}

export { FullScreenModal }
