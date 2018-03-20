import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { changeSignupPage } from '../Signup.action'
import { changeUsernameValue, clearError, error } from './Username.action'
import { checkUsername } from './Username.middleware'
import Mobile from './Username.mobile.js'
import Desktop from './Username.web.js'

class Username extends Component {
  handleSubmit = () => {
    if (this.props.username.length < 3) {
      return this.props.dispatch(
        error('Username must be at least 3 characters')
      )
    }
    if (this.props.username.length >= 3) {
      return this.props.dispatch(
        checkUsername(this.props.username, errorMessage => {
          if (errorMessage) {
            return this.props.dispatch(error(errorMessage))
          }
          if (!errorMessage) {
            this.props.dispatch(clearError())
            return this.props.dispatch(changeSignupPage('pin'))
          }
        })
      )
    }
  }
  handleOnChangeText = username => {
    this.props.dispatch(changeUsernameValue(username))
  }
  handleKeyEnter = e => {
    if (e.nativeEvent.charCode === 13) {
      return this.handleSubmit()
    }
  }
  gotoLogin = () => {
    return this.props.history.push('/login')
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            username={this.props.username}
            error={this.props.error}
            loader={this.props.loader.loading}
            handleSubmit={this.handleSubmit}
            handleOnChangeText={this.handleOnChangeText}
            handleKeyEnter={this.handleKeyEnter}
            gotoLogin={this.gotoLogin}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            username={this.props.username}
            error={this.props.error}
            loader={this.props.loader.loading}
            handleSubmit={this.handleSubmit}
            handleOnChangeText={this.handleOnChangeText}
            handleKeyEnter={this.handleKeyEnter}
            gotoLogin={this.gotoLogin}
          />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  username: state.username.username,
  error: state.username.error,
  loader: state.loader
}))(Username)
