import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { showMobileLoginWithPasswordView } from '../Login.action'
import Mobile from './LoginEdge.mobile.js'
import { hideQRCode, showQRCode } from './LoginEdge.mobileState.js'
import Desktop from './LoginEdge.web.js'
import webStyle from './LoginEdge.webStyle.scss'

class LoginEdge extends Component {
  toggleQRCode = () => {
    if (!this.props.view) {
      return this.props.dispatch(showQRCode())
    }
    if (this.props.view) {
      return this.props.dispatch(hideQRCode())
    }
  }
  showMobilePasswordView = () => {
    return this.props.dispatch(showMobileLoginWithPasswordView())
  }
  showMobilePasswordView = () => {
    return this.props.dispatch(showMobileLoginWithPasswordView())
  }
  goToSignupPage = () => {
    return this.props.history.push('/signup')
  }
  render () {
    return (
      <section className={webStyle.rootContainer}>
        <MediaQuery minWidth={720}>
          <Desktop
            view={this.props.view}
            dispatch={this.props.dispatch}
            edgeId={this.props.edgeId}
            edgeUsername={this.props.edgeUsername}
            edgeAccount={this.props.edgeAccount}
            edgeObject={this.props.edgeObject}
            toggleQRCode={this.toggleQRCode}
            goToSignupPage={this.goToSignupPage}
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
            toggleQRCode={this.toggleQRCode}
            goToSignupPage={this.goToSignupPage}
            showMobilePasswordView={this.showMobilePasswordView}
          />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  edgeId: state.login.edgeLoginResults.id,
  edgeUsername: state.login.edgeUsername,
  edgeAccount: state.login.edgeAccount,
  edgeObject: state.login.edgeLoginResults,
  view: state.login.mobileShowQRCode
}))(LoginEdge)
