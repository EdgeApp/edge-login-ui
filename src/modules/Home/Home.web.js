import React, { Component } from 'react'
import { connect } from 'react-redux'

import { browserHistory } from 'react-router'

class Home extends Component {

  _handleLogout = () => {
    browserHistory.push('/') 
  }

  render () {
    return (
      <div>
        <p>Home Page</p>
        <p><button type="button" onClick={this._handleLogout}>Log Out</button></p>
      </div>
    )
  }

}

export default connect(state => ({
  user: state.user,
  loader: state.loader
}))(Home)
