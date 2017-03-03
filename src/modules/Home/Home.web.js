import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-toolbox/lib/button'
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { Link } from 'react-toolbox/lib/link'
import signinButton from 'theme/signinButton.scss'
import t from 'lib/web/LocaleStrings'
import { withRouter } from 'react-router'

import ChangePin from '../ChangePin/ChangePin.web'
import ChangePassword from '../ChangePassword/ChangePassword.web'
import PasswordRecovery from '../PasswordRecovery/PasswordRecovery.web'

import { showPinView } from '../ChangePin/ChangePin.action'
import { showPasswordView } from '../ChangePassword/ChangePassword.action'
import { showPasswordRecoveryView } from '../PasswordRecovery/PasswordRecovery.action'

class Home extends Component {

  _handleLogout = () => {
    if (window.parent.exitCallback) {
      window.parent.exitCallback()
    }
  }

  _handleChangePin = () => {
    this.props.dispatch(
      showPinView()
    )
  }

  _handleChangePassword = () => {
    this.props.dispatch(
      showPasswordView()
    )
  }

  _handlePasswordRecovery = () => {
    this.props.dispatch(
      showPasswordRecoveryView()
    )
  }

  render () {
    return (
      <div>
        <h5>Manage Account</h5>
        <h6>Account: { this.props.user ? this.props.user.username : '' }</h6>
        <p><Link onClick={ this._handleChangePin }>{t('activity_signup_title_change_pin')}</Link></p>
        <p><Link onClick={ this._handleChangePassword }>{t('activity_signup_password_change_title')}</Link></p>
        <p><Link onClick={ this._handlePasswordRecovery }>{t('activity_recovery_button_title')}</Link></p>
        <Button theme={signinButton} type='button' onClick={this._handleLogout}>{t('string_done')}</Button>
        <ChangePin />
        <ChangePassword />
        <PasswordRecovery />
      </div>
    )
  }

}

Home = withRouter(Home)
export default connect(state => ({
  user: state.user,
  loader: state.loader
}))(Home)
