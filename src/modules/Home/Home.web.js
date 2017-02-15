import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-toolbox/lib/button'
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import signinButton from 'theme/signinButton.scss'
import t from 'lib/web/LocaleStrings'
import { Link, browserHistory } from 'react-router'

class Home extends Component {

  handleLogout = () => {
    browserHistory.push('/')
  }

  render () {
    return (
      <Card>
        <CardTitle>
        Manage Account
        </CardTitle>
        <CardText>
          <p><Link to='/changePassword'>Change Password</Link></p>
          <p><Link to='/changePin'>Change Pin</Link></p>
          <p><Link to='/passwordRecovery'>Password Recovery</Link></p>
        </CardText>
        <CardActions>
          <Button theme={signinButton} type='button' onClick={this.handleLogout}>{t('drawer_logout')}</Button>
        </CardActions>
      </Card>
    )
  }

}

export default connect(state => ({
  user: state.user,
  loader: state.loader
}))(Home)
