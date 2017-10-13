import React, { Component } from 'react'
import { connect } from 'react-redux'

import QRCode from './QRCode.js'
import Divider from './Divider.mobile.js'
import { showQRCode, hideQRCode } from './LoginEdge.mobileState.js'

import styles from './NewAccount.mobileStyle.scss'

class NewAccountMobile extends Component {
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
        <Divider />
        <button className={styles.createButton} onClick={e => this.props.history.push('/signup')}>Create Account</button>
        <p className={styles.alreadyAccount}>
          Already have an account? <span className={styles.link} onClick={this.props.login}>Log in</span>
        </p>
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
}))(NewAccountMobile)
