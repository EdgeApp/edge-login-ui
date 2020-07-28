// @flow

import React, { Component } from 'react'
import { Dimensions, Platform, View } from 'react-native'
import Modal from 'react-native-modal'

import * as Constants from '../../../constants/index.js'

type Props = {
  children: any
}

export class FullScreenModal extends Component<Props> {
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

const FullScreenModalStyle = {
  container: {
    margin: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.MODAL_BOX
  },
  modalBox: {
    width: '100%',
    height: '100%',
    backgroundColor: Constants.WHITE
  }
}
