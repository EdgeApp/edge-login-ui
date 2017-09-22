import React, { Component } from 'react'
const QRCode = require('qrcode.react')
import { withRouter } from 'react-router'

import { connect } from 'react-redux'
import styles from './LoginEdge.mobileStyle.scss'

import { edgeLogin } from '../Login.middleware'
import { closeLoading } from '../../Loader/Loader.action'

import { showQRCode, hideQRCode } from './LoginEdge.mobileState.js'

class LoginEdge extends Component {
  componentWillUnmount () {
    if (this.props.edgeObject) {
      this.props.edgeObject.cancelRequest()
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
              return this.props.router.push('/account')
            }
          }
        })
      )
  }
  _toggleQRCode = () => {
    if (!this.props.view) {
      this.props.dispatch(showQRCode())
    }
    if (this.props.view) {
      this.props.dispatch(hideQRCode())
    }
  }
  renderBarcode = () => {
    const { edgeId } = this.props
    if (edgeId) {
      const qrCodeVal = 'airbitz://edge/' + edgeId
      return <QRCode value={qrCodeVal} size={180} />
    } else {
      return null
    }
  }
  renderLoginLink = () => {
    const { edgeId } = this.props
    if (edgeId) {
      return `https://airbitz.co/elf/?address=${edgeId}`
    }
  }
  _renderQRCode = () => {
    if (!this.props.view) {
      return null
    }
    if (this.props.view) {
      return (
        <div className={styles.qrCode}>
          <a target='_blank' href={this.renderLoginLink()}>
            {this.renderBarcode()}
          </a>
          <p className={styles.text}>Scan using Airbitz wallet to login</p>
        </div>
      )
    }
  }
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.navigation}>
          <div className={styles.navBoxActive}>
            <p className={styles.text}>
              Edge Login
            </p>
          </div>
          <div className={styles.navBox}>
            <p className={styles.text}>
              Username Login
            </p>
          </div>
        </div>
        <div className={styles.rectangle}>
          <p className={styles.text}>
            Tap to login with the <br />
            Airbitz mobile wallet
          </p>
        </div>
        {this._renderQRCode()}
        <p className={styles.QRTextToggle} onClick={this._toggleQRCode}>
          {this.props.view ? 'Hide QR code' : 'Show QR code'}
        </p>
        <div className={styles.divider} />
        <div className={styles.signUp}>
          <p className={styles.question}>
            Don’t have an account?
          </p>
          <p className={styles.create}>
            Create account
          </p>
        </div>
        <div className={styles.divider} />
        <p className={styles.appText}>
          Increase your Account Security. <br />
          Download Airbitz & enable 2FA
        </p>
      </div>
    )
  }
}

const LoginEdgeWithRouter = withRouter(LoginEdge)
const LoginEdgeWithRedux = connect(state => ({
  edgeId: state.login.edgeLoginResults.id,
  edgeUsername: state.login.edgeUsername,
  edgeAccount: state.login.edgeAccount,
  edgeObject: state.login.edgeLoginResults,
  view: state.login.mobileShowQRCode
}))(LoginEdgeWithRouter)

export default LoginEdgeWithRedux
