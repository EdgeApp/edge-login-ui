// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import s from '../../../common/locales/strings.js'
import { theme } from '../../../common/theme/edgeDark.js'
import EdgeLoginQrConnector from '../../../native/connectors/componentConnectors/EdgeLoginQrConnector'
import { EdgeLoginQrStyle } from '../../../native/styles'
import { type AirshipBridge, AirshipModal, ContentArea } from './modalParts.js'

type Props = {
  bridge: AirshipBridge<void>
}

export class QrCodeModal extends Component<Props> {
  render() {
    const { bridge } = this.props
    return (
      <AirshipModal bridge={bridge} onCancel={() => bridge.resolve()}>
        <View style={styles.container}>
          <ContentArea padding={rem(1.5)}>
            <View style={styles.contentContainer}>
              <Text style={styles.header}>{s.strings.qr_modal_header}</Text>
              <EdgeLoginQrConnector propStyle={qrCodeStyle} />
              <TouchableWithoutFeedback onPress={() => bridge.resolve()}>
                <View style={styles.downIconContainer}>
                  <Entypo
                    name="chevron-thin-down"
                    size={theme.rem(1.25)}
                    color={theme.alertModalCloseIcon}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ContentArea>
        </View>
      </AirshipModal>
    )
  }
}

const { rem } = theme
const qrCodeStyle = {
  ...EdgeLoginQrStyle,
  container: {
    ...EdgeLoginQrStyle.container,
    width: rem(14),
    height: rem(14)
  },
  qrCodeSize: rem(14)
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.qrCodeModalBackgroud,
    borderTopLeftRadius: rem(1),
    borderTopRightRadius: rem(1)
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    color: theme.headerText,
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    marginBottom: rem(1.5)
  },
  downIconContainer: {
    marginTop: rem(1.5),
    alignItems: 'center'
  }
})
