import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { closeAccountCacheDeleteModal } from './AccountCacheDelete.action.js'
import Mobile from './AccountCacheDelete.mobile.js'
import Desktop from './AccountCacheDelete.web.js'

class AccountCacheDelete extends Component {
  closeModal = () => {
    return this.props.dispatch(closeAccountCacheDeleteModal())
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            view={this.props.view}
            name={this.props.name}
            close={this.closeModal}
            deleteAccount={this.props.delete}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            view={this.props.view}
            name={this.props.name}
            close={this.closeModal}
            deleteAccount={this.props.delete}
          />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  view: state.modal.accountCacheDelete,
  name: state.cachedUsers.userToDeleteFromUserCache
}))(AccountCacheDelete)
