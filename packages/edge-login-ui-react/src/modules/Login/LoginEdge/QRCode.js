import React, { Component } from 'react'

import { closeLoading } from '../../Loader/Loader.action'
import { edgeLogin } from '../Login.middleware'

const QRCode = require('qrcode.react')

export default class QRCodeEdge extends Component {
  componentWillUnmount () {
    if (this.props.edgeObject) {
      return this.props.edgeObject.cancelRequest()
    }
  }
  componentDidMount () {
    this.props.dispatch(
      edgeLogin((error, account) => {
        const abcuiCallback = window.parent.abcui
        if (!error) {
          if (abcuiCallback.loginCallback) {
            return abcuiCallback.loginCallback(null, account)
          }
          if (!window.parent.loginCallback) {
            this.props.dispatch(closeLoading())
            return this.props.history.push('/account')
          }
        }
      })
    )
  }
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
