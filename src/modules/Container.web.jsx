import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'react-toolbox/lib/dialog'
import { selectUserToLogin, setCachedUsers } from './CachedUsers/CachedUsers.action'
import { userLogin } from './Login/Login.action'

import Loader from './Loader/Loader.web'
import ErrorModal from './ErrorModal/ErrorModal.web'
import WarningModal from './WarningModal/WarningModal.web'
import abcctx from 'lib/web/abcContext'

import styles from './Container.style'

class SignupContainer extends Component {

  _handleToggle = () => {
    // this.refs.loginWithAirbitz.cancelRequest()
    // if (this.refs.pinPasswordForm) {
    //   this.refs.pinPasswordForm.onClose()
    // }
    if (window.parent.exitCallback) {
      window.parent.exitCallback()
    }
    console.log('closing Airbitz login')
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
  loadAccount = () => {
    if(window.parent.abcAccount){
      dispatch(
        userLogin(window.parent.abcAccount)
      )
    }
  }
  componentWillMount () {
    this.loadData()
    this.loadAccount()
  }
  componentWillUpdate () {
    this.loadData()
  }
  render () {
    return (

      <div className='app'>
        <Dialog
          active
          onEscKeyDown={this._handleToggle}
          onOverlayClick={this._handleToggle}
        >
          <div className={styles.exitTooltip} onClick={this._handleToggle}>X</div>
          {this.props.children}
          <Loader />
          <ErrorModal />
          <WarningModal />
        </Dialog>
      </div>
    )
  }
}

export default connect(state => ({

  loader: state.loader

}))(SignupContainer)
