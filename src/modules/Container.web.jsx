import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'react-toolbox/lib/dialog';
import { Button } from 'react-toolbox/lib/button';
import { removeWhiteOverlay, showWhiteOverlayComplete } from './Landing.action'
import { selectUserToLogin, setCachedUsers } from './CachedUsers/CachedUsers.action'

import Loader from './Loader/Loader.web'
import ErrorModal from './ErrorModal/ErrorModal.web'
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
  componentWillMount () {
    const dispatch = this.props.dispatch
    abcctx(ctx => {
      const cachedUsers = ctx.listUsernames()
      const lastUser = global.localStorage.getItem('lastUser')

      dispatch(setCachedUsers(cachedUsers))
      if (lastUser) {
        dispatch(selectUserToLogin(lastUser))
      }
    })
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
        </Dialog>
      </div>
    )
  }
}

export default connect(state => ({

  loader: state.loader,

}))(Container)

