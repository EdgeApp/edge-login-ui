import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { closePasswordRecoverySuccessModal } from './PasswordRecoverySuccess.action.js'
import Mobile from './PasswordRecoverySuccess.mobile.js'
import Desktop from './PasswordRecoverySuccess.web.js'

class PasswordRecoverySuccess extends Component {
  handleClose = () => {
    return this.props.dispatch(closePasswordRecoverySuccessModal())
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            view={this.props.view}
            close={this.handleClose}
            finish={this.props.finish}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            view={this.props.view}
            close={this.handleClose}
            finish={this.props.finish}
          />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  view: state.modal.passwordRecoverySuccess
}))(PasswordRecoverySuccess)
