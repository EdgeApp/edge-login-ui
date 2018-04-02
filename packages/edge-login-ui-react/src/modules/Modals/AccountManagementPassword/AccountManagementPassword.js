import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import {
  changeAccountManagementPasswordModalPassword,
  clearAccountManagementModal,
  closeAccountManagementModal,
  errorAccountManagementModal
} from './AccountManagementPassword.action.js'
import { checkPassword } from './AccountManagementPassword.middleware.js'
import Mobile from './AccountManagementPassword.mobile.js'
import Desktop from './AccountManagementPassword.web.js'

class AccountManagementPassword extends Component {
  handleClose = () => {
    this.props.dispatch(clearAccountManagementModal())
    this.props.dispatch(changeAccountManagementPasswordModalPassword(''))
    return this.props.dispatch(closeAccountManagementModal())
  }
  handleSubmit = () => {
    const callback = error => {
      if (error) {
        this.props.dispatch(clearAccountManagementModal())
        return this.props.dispatch(errorAccountManagementModal(error))
      }
      if (!error) {
        this.props.history.push(this.props.route)
        return this.handleClose()
      }
    }
    return this.props.dispatch(
      checkPassword(this.props.password, this.props.user, callback)
    )
  }
  passwordKeyPressed = e => {
    if (e.charCode === 13) {
      return this.handleSubmit()
    }
  }
  changePasswordValue = value => {
    return this.props.dispatch(
      changeAccountManagementPasswordModalPassword(value)
    )
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            close={this.handleClose}
            submit={this.handleSubmit}
            passwordKeyPressed={this.passwordKeyPressed}
            changePasswordValue={this.changePasswordValue}
            view={this.props.view}
            password={this.props.password}
            route={this.props.route}
            error={this.props.error}
            user={this.props.user}
            loader={this.props.loader.loading}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            close={this.handleClose}
            submit={this.handleSubmit}
            passwordKeyPressed={this.passwordKeyPressed}
            changePasswordValue={this.changePasswordValue}
            view={this.props.view}
            password={this.props.password}
            route={this.props.route}
            error={this.props.error}
            user={this.props.user}
            loader={this.props.loader.loading}
          />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  view: state.modal.accountManagementPassword.view,
  password: state.modal.accountManagementPassword.password,
  route: state.modal.accountManagementPassword.route,
  error: state.modal.accountManagementPassword.error,
  loader: state.loader,
  user: state.user
}))(AccountManagementPassword)
