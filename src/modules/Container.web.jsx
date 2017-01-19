import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'react-toolbox/lib/dialog';
import { Button } from 'react-toolbox/lib/button';
import { removeWhiteOverlay, showWhiteOverlayComplete } from './Landing.action'
import { selectUserToLogin, setCachedUsers } from './CachedUsers/CachedUsers.action'

import Loader from './Loader/Loader.web'
import ErrorModal from './ErrorModal/ErrorModal.web'
import WarningModal from './WarningModal/WarningModal.web'
import abcctx from 'lib/web/abcContext'
class Container extends Component {

  handleToggle = () => {
    // this.refs.loginWithAirbitz.cancelRequest()
    // if (this.refs.pinPasswordForm) {
    //   this.refs.pinPasswordForm.onClose()
    // }
    console.log('closing Airbitz login')
    if (window.parent.exitCallback) {
      window.parent.exitCallback()
    }
  }
  loadData () {
    const dispatch = this.props.dispatch
    abcctx(ctx => {
      const cachedUsers = ctx.listUsernames()
      const lastUser = window.localStorage.getItem('lastUser')
      dispatch(setCachedUsers(cachedUsers))
      if (lastUser) {
        dispatch(selectUserToLogin(lastUser))
      }
    })

  }
  componentWillMount () {
    this.loadData()
  }
  componentWillUpdate () {
    this.loadData()
  }
  render() {
    return (
        
      <div className="app">
        <Dialog
          active={true}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
        >
          {this.props.children}
          <Loader/>
          <ErrorModal/>
          <WarningModal />
        </Dialog>
      </div>
    )
  }
}

export default connect(state => ({

  loader: state.loader,

}))(Container)

