import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import {
  closeLoginUsingEdge,
  showMobileLoginWithPasswordView
} from '../Login.action'
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
  closeEdgeLoginView = () => {
    return this.props.dispatch(closeLoginUsingEdge())
  }
  goToSignupPage = () => {
    return this.props.history.push('/signup')
  }
  render () {
    return (
      <section className={webStyle.rootContainer}>
        <Desktop
          edgeId={this.props.edgeId}
          goToSignupPage={this.goToSignupPage}
          closeEdgeLoginView={this.closeEdgeLoginView}
        />
      </section>
    )
  }
}

export default connect(state => ({
  edgeId: state.login.edgeLoginResults.id,
  view: state.login.mobileShowQRCode
}))(LoginEdge)
