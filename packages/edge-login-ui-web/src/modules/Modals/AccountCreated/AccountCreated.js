import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { closeAccountCreatedModal } from './AccountCreated.action.js'
import Mobile from './AccountCreated.mobile.js'
import Desktop from './AccountCreated.web.js'

class AccountCreated extends Component {
  closeModal = () => {
    return this.props.dispatch(closeAccountCreatedModal())
  }
  render () {
    const name = window.parent.abcui.vendorName || window.abcui.vendorName
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            view={this.props.view}
            name={name}
            close={this.closeModal}
            cancel={this.props.cancel}
            submit={this.props.submit}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            view={this.props.view}
            name={name}
            close={this.closeModal}
            cancel={this.props.cancel}
            submit={this.props.submit}
          />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  view: state.modal.accountCreated
}))(AccountCreated)
