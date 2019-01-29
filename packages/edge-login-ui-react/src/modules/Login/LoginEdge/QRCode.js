import React, { Component } from 'react'

const QRCode = require('qrcode.react')

export default class QRCodeEdge extends Component {
  _renderBarcode = () => {
    const { edgeId } = this.props
    if (edgeId) {
      const qrCodeVal = 'airbitz://edge/' + edgeId
      return <QRCode value={qrCodeVal} size={180} />
    } else {
      return null
    }
  }
  _renderLoginLink = () => {
    const { edgeId } = this.props
    if (edgeId) {
      return `https://airbitz.co/elf/?address=${edgeId}`
    }
  }
  render () {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={this._renderLoginLink()}
      >
        {this._renderBarcode()}
      </a>
    )
  }
}
