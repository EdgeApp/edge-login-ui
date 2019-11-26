// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import { QrCode } from '../common/QrCode.js'

type Props = {
  style: Object,
  edgeLoginId: string,
  getQrCode(): void,
  cancelEdgeLogin(): void,
  cancelRequest(): void
}

export class EdgeLoginQrComponent extends Component<Props> {
  componentDidMount() {
    this.props.getQrCode()
  }

  componentWillUnmount() {
    this.props.cancelEdgeLogin()
    this.props.cancelRequest()
  }

  render() {
    const { style, edgeLoginId } = this.props
    const { qrCodeSize, qrCodeForeground, qrCodeBackground } = style

    return (
      <View style={style.container}>
        {edgeLoginId == null ? null : (
          <QrCode
            data={edgeLoginId}
            size={qrCodeSize}
            backgroundColor={qrCodeBackground.color}
            foregroundColor={qrCodeForeground.color}
          />
        )}
      </View>
    )
  }
}
