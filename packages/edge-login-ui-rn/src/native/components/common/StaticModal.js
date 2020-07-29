// @flow

import React, { Component } from 'react'
import { Dimensions, Platform, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'

import * as Constants from '../../../common/constants/index.js'
import { scale } from '../../../common/util/scaling.js'
import * as Styles from '../../styles/index.js'

type Props = {
  modalDismissTimerSeconds: number,
  body: any,
  cancel(): void
}

export class StaticModal extends Component<Props> {
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

const OFFSET_HACK = scale(-19)

const screenDimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}

const StaticModalStyle = {
  container: {
    position: 'absolute',
    bottom: OFFSET_HACK,
    left: OFFSET_HACK,
    right: OFFSET_HACK,
    top: OFFSET_HACK,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.MODAL_BOX
  },
  touchOut: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: Constants.TRANSPARENT
  },
  modalBox: {
    top: screenDimensions.height / 4,
    left: screenDimensions.width / 8,
    width: (screenDimensions.width * 3) / 4,
    alignItems: 'stretch',
    position: 'absolute',
    // height: (screenDimensions.height) / 3,
    backgroundColor: Constants.WHITE,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  header: {
    position: 'relative',
    height: Constants.STATIC_MODAL_HEADER_HEIGHT,
    width: '100%',
    backgroundColor: Constants.TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  bottom: {
    position: 'relative',
    width: '100%',
    backgroundColor: Constants.WHITE
  },
  bodyRow: {
    width: '100%',
    padding: scale(15)
  },
  shim: Styles.Shim.height,
  icon: {
    color: Constants.WHITE
  },
  iconSize: 36
}
