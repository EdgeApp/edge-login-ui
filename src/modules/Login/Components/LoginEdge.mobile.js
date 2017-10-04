import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './LoginEdge.mobileStyle.scss'
import QRCode from './QRCode.js'

import { showMobileLoginWithPasswordView } from '../Login.action'
import { showQRCode, hideQRCode } from './LoginEdge.mobileState.js'

class LoginEdgeMobile extends Component {
  _toggleQRCode = () => {
    if (!this.props.view) {
      this.props.dispatch(showQRCode())
    }
    if (this.props.view) {
      this.props.dispatch(hideQRCode())
    }
  }
  _renderQRCode = () => {
    if (this.props.view) {
      return (
        <div className={styles.qrCode}>
          <QRCode {...this.props} />
          <p className={styles.text}>Scan using Airbitz wallet to login</p>
        </div>
      )
    }
    if (!this.props.view) {
      return null
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
          <div className={styles.navBox} onClick={e => this.props.dispatch(showMobileLoginWithPasswordView())}>
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
          <p className={styles.create} onClick={e => this.props.history.push('/signup')}>
            Create account
          </p>
        </div>
        <div className={styles.dividerBottom} />
      </div>
    )
  }
}

export default connect(state => ({
  edgeId: state.login.edgeLoginResults.id,
  edgeUsername: state.login.edgeUsername,
  edgeAccount: state.login.edgeAccount,
  edgeObject: state.login.edgeLoginResults,
  view: state.login.mobileShowQRCode
}))(LoginEdgeMobile)
