// @flow

import React, { Component } from 'react'
import { Dimensions, Platform, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'

import * as Constants from '../../../common/constants'
import { StaticModalStyle } from '../../../common/styles/'

type Props = {
  modalDismissTimerSeconds: number,
  body: any,
  cancel(): void
}
class StaticModal extends Component<Props> {
  // $FlowFixMe
  reset: number
  componentDidMount() {
    if (this.props.modalDismissTimerSeconds) {
      this.reset = setTimeout(() => {
        this.props.cancel()
      }, this.props.modalDismissTimerSeconds * 1000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.reset)
  }

  render() {
    const deviceWidth = Dimensions.get('window').width
    const deviceHeight =
      Platform.OS === 'ios'
        ? Dimensions.get('window').height
        : require('react-native-extra-dimensions-android').get(
            'REAL_WINDOW_HEIGHT'
          )

    const styles = StaticModalStyle
    return (
      <Modal
        animationType="slide"
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        style={styles.container}
        transparent
        visible
      >
        <TouchableOpacity style={styles.touchOut} onPress={this.props.cancel}>
          <View style={styles.modalBox}>
            <LinearGradient
              style={styles.header}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={Constants.GRADIENT_REVERSE}
            >
              <SimpleIcon
                name="check"
                style={styles.icon}
                size={styles.iconSize}
              />
            </LinearGradient>
            <View style={styles.bottom}>
              <View style={styles.bodyRow}>{this.props.body}</View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}

export { StaticModal }
