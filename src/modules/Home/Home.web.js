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

import { showPinView } from '../ChangePin/ChangePin.action'
import { showPasswordView } from '../ChangePassword/ChangePassword.action'

class Home extends Component {

  _handleLogout = () => {
    this.props.router.push('/')
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

  render () {
    return (
      <Card>
        <CardTitle>
        Manage Account
        </CardTitle>
        <CardText>
          <p><Link href='#' onClick={ this._handleChangePin }>{t('activity_signup_title_change_pin')}</Link></p>
          <p><Link href='#' onClick={ this._handleChangePassword }>{t('activity_signup_password_change_title')}</Link></p>
        </CardText>
        <CardActions>
          <Button theme={signinButton} type='button' onClick={this._handleLogout}>{t('drawer_logout')}</Button>
        </CardActions>
        <ChangePin />
        <ChangePassword />
      </Card>
    )
  }

}

Home = withRouter(Home)
export default connect(state => ({
  user: state.user,
  loader: state.loader
}))(Home)
