import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import {
  closePasswordRecoverySuccessModal,
  openPasswordRecoverySuccessModal
} from '../../Modals/PasswordRecoverySucess/PasswordRecoverySuccess.action.js'
import PasswordRecoveryTokenSuccess from '../../Modals/PasswordRecoverySucess/PasswordRecoverySuccess.js'
import {
  changePasswordRecoveryEmail,
  errorPasswordRecoveryEmail,
  finishPasswordRecoveryToken
} from './PasswordRecoveryToken.action.js'
import { checkEmail } from './PasswordRecoveryToken.middleware.js'
import Mobile from './PasswordRecoveryToken.mobile.js'
import Desktop from './PasswordRecoveryToken.web.js'

class PasswordRecoveryToken extends Component {
  handleSubmit = address => {
    const callback = (error, url) => {
      if (error) {
        return this.props.dispatch(errorPasswordRecoveryEmail(error))
      }
      if (!error && url) {
        window.open(url, '_blank')
        return this.props.dispatch(openPasswordRecoverySuccessModal())
        // return this.props.dispatch(finishPasswordRecoveryToken())
      }
    }
    return this.props.dispatch(
      checkEmail(
        address,
        this.props.email,
        this.props.token,
        this.props.account.username,
        callback
      )
    )
  }
  handleChangeEmail = value => {
    return this.props.dispatch(changePasswordRecoveryEmail(value))
  }
  handleFinish = () => {
    this.props.dispatch(finishPasswordRecoveryToken())
    this.props.dispatch(closePasswordRecoverySuccessModal())
    return this.props.history.push('/account')
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            email={this.props.email}
            error={this.props.error}
            handleSubmit={this.handleSubmit}
            handleChangeEmail={this.handleChangeEmail}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            email={this.props.email}
            error={this.props.error}
            handleSubmit={this.handleSubmit}
            handleChangeEmail={this.handleChangeEmail}
          />
        </MediaQuery>
        <PasswordRecoveryTokenSuccess finish={this.handleFinish} />
      </section>
    )
  }
}

export default connect(state => ({
  account: state.user,
  token: state.passwordRecoveryToken.token,
  email: state.passwordRecoveryToken.email,
  error: state.passwordRecoveryToken.error
}))(PasswordRecoveryToken)
