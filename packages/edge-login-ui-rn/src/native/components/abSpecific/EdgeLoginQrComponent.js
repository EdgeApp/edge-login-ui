// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import { EdgeLoginQrStyle } from '../../../native/styles'
import { QrCode } from '../common/QrCode.js'

type OwnProps = {
  propStyle?: Object
}

type StateProps = {
  edgeLoginId: string,
  getQrCode(): void,
  cancelEdgeLogin(): void,
  cancelRequest(): void
}

type Props = OwnProps & StateProps

export class EdgeLoginQrComponent extends Component<Props> {
  componentDidMount() {
    this.props.getQrCode()
  }

  componentWillUnmount() {
    this.props.cancelEdgeLogin()
    this.props.cancelRequest()
  }

  render() {
    const { edgeLoginId } = this.props
    const style = this.props.propStyle || EdgeLoginQrStyle
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
