import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { openLogin, openLoginUsingEdge } from '../Login.action'
import { hideQRCode, showQRCode } from '../LoginEdge/LoginEdge.mobileState.js'
import Mobile from './NewAccount.mobile.js'
import Desktop from './NewAccount.web.js'
import webStyle from './NewAccount.webStyle.scss'

class NewAccount extends Component {
  goToSignupPage = () => {
    return this.props.history.push('/signup')
  }
  handleOpenLoginWithPasswordPage = () => {
    return this.props.dispatch(openLogin())
  }
  handleOpenLoginWithEdgePage = () => {
    return this.props.dispatch(openLoginUsingEdge())
  }
  toggleQRCode = () => {
    if (!this.props.view) {
      this.props.dispatch(showQRCode())
    }
    if (this.props.view) {
      this.props.dispatch(hideQRCode())
    }
  }
  render () {
    return (
      <section className={webStyle.rootContainer}>
        <Desktop
          goToSignupPage={this.goToSignupPage}
          handleOpenLoginWithPasswordPage={this.handleOpenLoginWithPasswordPage}
          handleOpenLoginWithEdgePage={this.handleOpenLoginWithEdgePage}
        />
      </section>
    )
  }
}

export default connect(state => ({
  view: state.login.mobileShowQRCode,
  edgeId: state.login.edgeLoginResults.id,
  edgeUsername: state.login.edgeUsername,
  edgeAccount: state.login.edgeAccount,
  edgeObject: state.login.edgeLoginResults
}))(NewAccount)
