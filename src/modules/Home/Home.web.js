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
import PasswordRecoverySuccess from '../PasswordRecovery/PasswordRecoverySuccess.web'

import { showPinView } from '../ChangePin/ChangePin.action'
import { showPasswordView } from '../ChangePassword/ChangePassword.action'
import { showPasswordRecoveryView } from '../PasswordRecovery/PasswordRecovery.action'
import { userLogin } from '../Login/Login.action'

import skipButton from 'theme/skipButton.scss'
import styles from './Home.webStyle'

class Home extends Component {

  componentWillMount () {
    if(window.parent.abcAccount){
      this.props.dispatch(
        userLogin(window.parent.abcAccount)
      )
    }
  }

  _handleLogout = () => {
      if (window.parent.exitCallback) {
        window.parent.exitCallback(null)
      }
      if (!window.parent.exitCallback) {
        this.props.router.push('/')
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
      <div className={styles.container}>
        <h4>Manage Account</h4>
        <h5 className={styles.username}><b>{ this.props.user ? this.props.user.username : '' }</b></h5>
        <div className={styles.sectionLinks}>
          <p><a className={styles.links} onClick={ this._handleChangePin }>{t('activity_signup_title_change_pin')}</a></p>
          <p><a className={styles.links} onClick={ this._handleChangePassword }>{t('activity_signup_password_change_title')}</a></p>
          <p><a className={styles.links} onClick={ this._handlePasswordRecovery }>{t('activity_recovery_button_title')}</a></p>
        </div>
        <Button className={styles.button} raised primary type='button' onClick={this._handleLogout}>{t('string_done')}</Button>
        <ChangePin />
        <ChangePassword />
        <PasswordRecovery />
        <PasswordRecoverySuccess />
      </div>
    )
  }

}

Home = withRouter(Home)
export default connect(state => ({
  user: state.user,
  loader: state.loader
}))(Home)
