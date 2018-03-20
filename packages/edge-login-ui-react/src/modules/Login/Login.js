import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import Mobile from './Login.mobile.js'
import Desktop from './Login.web.js'

class Login extends Component {
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            pin={this.props.pin}
            password={this.props.password}
            mobileLogin={this.props.mobileLogin}
            history={this.props.history}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            pin={this.props.pin}
            password={this.props.password}
            mobileLogin={this.props.mobileLogin}
            history={this.props.history}
          />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  pin: state.login.viewPIN,
  password: state.login.viewPassword,
  mobileLogin: state.login.mobileLoginView
}))(Login)
