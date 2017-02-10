import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-toolbox/lib/button'
import { Card, CardActions } from 'react-toolbox/lib/card'
import signinButton from 'theme/signinButton.scss'
import t from 'lib/web/LocaleStrings'
import { Link, browserHistory } from 'react-router'

class Home extends Component {

  _handleLogout = () => {
    browserHistory.push('/')
  }

  render () {
    return (
      <Card>
        <CardActions>
          <Button theme={signinButton} type='button' onClick={this._handleLogout}>{t('drawer_logout')}</Button>
        </CardActions>
        <div>
          <p><Link to='/changePassword'>Change Password</Link></p>
          <p><Link to='/changePin'>Change Pin</Link></p>
          <p><Link to='/passwordRecovery'>Password Recovery</Link></p>
        </div>
      </Card>
    )
  }

}

export default connect(state => ({
  user: state.user,
  loader: state.loader
}))(Home)
