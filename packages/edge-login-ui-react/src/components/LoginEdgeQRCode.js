import React, { Component } from 'react'

const QRCode = require('qrcode.react')

export default class QRCodeEdge extends Component {
  _renderBarcode = () => {
    const qrCodeVal = 'airbitz://edge/' + this.props.edgeId
    return <QRCode value={qrCodeVal} size={160} />
  }
  render () {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.edge.app/edgelogin?address=${this.props.edgeId}`}
      >
        {this._renderBarcode()}
      </a>
    )
  }
}
