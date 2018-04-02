import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { closeForgotPasswordModal } from './ForgotPassword.action.js'
import Mobile from './ForgotPassword.mobile.js'
import Desktop from './ForgotPassword.web.js'

class ForgotPassword extends Component {
  handleClose = () => {
    return this.props.dispatch(closeForgotPasswordModal())
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop view={this.props.view} close={this.handleClose} />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile view={this.props.view} close={this.handleClose} />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  view: state.modal.forgotPassword
}))(ForgotPassword)
