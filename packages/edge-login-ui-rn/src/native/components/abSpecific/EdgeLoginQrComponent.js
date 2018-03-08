// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import QrCode from 'react-native-qrcode'

type Props = {
  style: Object,
  edgeLoginId: string,
  getQrCode(): void,
  cancelEdgeLogin(): void,
  cancelRequest(): void
}

class EdgeLoginQrComponent extends Component<Props> {
  componentDidMount () {
    this.props.getQrCode()
  }
  componentWillUnmount () {
    this.props.cancelEdgeLogin()
    this.props.cancelRequest()
  }
  renderQR (style: Object) {
    if (this.props.edgeLoginId) {
      return (
        <QrCode
          style={style.qrCode}
          value={this.props.edgeLoginId}
          bgColor={style.qrCodeBackground.color}
          fgColor={style.qrCodeForeground.color}
          size={style.qrCodeSize}
        />
      )
    }
    return null
  }
  render () {
    const style = this.props.style
    return <View style={style.container}>{this.renderQR(style)}</View>
  }
}

export { EdgeLoginQrComponent }
