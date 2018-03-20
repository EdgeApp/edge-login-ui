import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { openAccountCreatedModal } from '../../Modals/AccountCreated/AccountCreated.action.js'
import AccountCreated from '../../Modals/AccountCreated/AccountCreated.js'
import { hideSignInDetails, showSignInDetails } from './ReviewDetails.action'
import Mobile from './ReviewDetails.mobile.js'
import Desktop from './ReviewDetails.web.js'

class Review extends Component {
  toggleInfo = () => {
    if (!this.props.view) {
      return this.props.dispatch(showSignInDetails())
    }
    if (this.props.view) {
      return this.props.dispatch(hideSignInDetails())
    }
  }
  cancel = () => {
    if (window.abcui.loginCallback) {
      return window.abcui.loginCallback(null, this.props.account)
    }
    return this.props.history.push('/account')
  }
  submit = () => {
    if (window.abcui.loginWithoutClosingCallback) {
      window.abcui.loginWithoutClosingCallback(null, this.props.account)
    }
    return this.props.history.push('/passwordrecovery')
  }
  handleOpenAccountCreatedModal = () => {
    return this.props.dispatch(openAccountCreatedModal())
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            view={this.props.view}
            details={this.props.details}
            toggleInfo={this.toggleInfo}
            handleOpenAccountCreatedModal={this.handleOpenAccountCreatedModal}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            view={this.props.view}
            details={this.props.details}
            toggleInfo={this.toggleInfo}
            handleOpenAccountCreatedModal={this.handleOpenAccountCreatedModal}
          />
        </MediaQuery>
        <AccountCreated cancel={this.cancel} submit={this.submit} />
      </section>
    )
  }
}

export default connect(state => ({
  details: state.reviewDetails.details,
  account: state.user,
  view: state.reviewDetails.view
}))(Review)
