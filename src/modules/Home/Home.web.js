import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-toolbox/lib/button';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import signinButton from 'theme/signinButton.scss';
import t from 'lib/web/LocaleStrings'
import { browserHistory } from 'react-router'

class Home extends Component {

  _handleLogout = () => {
    browserHistory.push('/') 
  }

  render () {
    return (
      <Card>
        <CardActions>
        <Button theme={signinButton} type="button" onClick={this._handleLogout}>{t('drawer_logout')}</Button>
        </CardActions>
      </Card>
    )
  }

}

export default connect(state => ({
  user: state.user,
  loader: state.loader
}))(Home)
