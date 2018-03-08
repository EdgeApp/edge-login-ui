import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { openLogin } from '../Login.action'
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
        <MediaQuery minWidth={720}>
          <Desktop
            goToSignupPage={this.goToSignupPage}
            handleOpenLoginWithPasswordPage={
              this.handleOpenLoginWithPasswordPage
            }
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            view={this.props.view}
            dispatch={this.props.dispatch}
            edgeId={this.props.edgeId}
            edgeUsername={this.props.edgeUsername}
            edgeAccount={this.props.edgeAccount}
            edgeObject={this.props.edgeObject}
            goToSignupPage={this.goToSignupPage}
            handleOpenLoginWithPasswordPage={
              this.handleOpenLoginWithPasswordPage
            }
            toggleQRCode={this.toggleQRCode}
          />
        </MediaQuery>
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
