import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './LoginWithPassword.mobileStyle.scss'
import Input from 'react-toolbox/lib/input'

import {
  loginUsername,
  loginPassword,
  openUserList,
  closeUserList,
  showMobileLoginEdgeView
} from '../Login.action.js'
// import PasswordRecovery from '../../Modals/PasswordRecovery/PasswordRecovery.web.js'
import CachedUsers from '../../CachedUsers/CachedUsers.web.js'
// import { openPasswordRecoveryModal } from '../../Modals/PasswordRecovery/PasswordRecovery.action.js'

class LoginWithPasswordMobile extends Component {
  _usernameKeyPress = (e) => {
    if (e.charCode === 13) {
      return this.password.getWrappedInstance().focus()
    }
  }
  _passwordKeyPress = (e) => {
    if (e.charCode === 13) {
      if (!this.props.loader.loading) {
        return this.props.login(this.props.username, this.props.password)
      }
    }
  }
  _showCachedUsers = () => {
    this.props.dispatch(openUserList())
    this.pin.getWrappedInstance().blur()
  }
  _hideCachedUsers = () => {
    this.props.dispatch(closeUserList())
    this.pin.getWrappedInstance().focus()
  }
  render () {
    const {dispatch, username, password} = this.props
    const usersDropdown = () => {
      return (
        <Input
          type='text'
          label='Username'
          name='username'
          onKeyPress={this._usernameKeyPress}
          onChange={value => dispatch(loginUsername(value))}
          value={username}
          ref={input => { this.username = input }}
          onFocus={this._showCachedUsers}
          onBlur={this._hideCachedUsers}
        />
      )
    }
    return (
      <div className={styles.container}>
        <div className={styles.navigation}>
          <div className={styles.navBox} onClick={e => this.props.dispatch(showMobileLoginEdgeView())}>
            <p className={styles.text}>
              Edge Login
            </p>
          </div>
          <div className={styles.navBoxActive}>
            <p className={styles.text}>
              Username Login
            </p>
          </div>
        </div>
        <p className={styles.header}>Log in with your username and <br />password</p>
        <div className={styles.forms}>
          <CachedUsers
            component={usersDropdown()}
            area='passwordLogin'
            containerClassName={styles.cachedUsers}
            userListClassName={styles.userListClassName}
          />
          <Input
            type='password'
            label='Password'
            name='password'
            onKeyPress={this._passwordKeyPress}
            onChange={value => dispatch(loginPassword(value))}
            value={password}
            ref={input => { this.password = input }}
            className={styles.form}
            error={this.props.error}
          />
        </div>

        <p className={styles.forgotPassword}>Forgot Password</p>
        <button
          className={this.props.loader.loading ? styles.primaryLoadMobile : styles.primaryMobile}
          onClick={e => this.props.login(username, password)}
        >
          { this.props.loader.loading ? <div className={styles.loader} /> : 'Sign In' }
        </button>
        {/* <button className={styles.signUpButton}>Sign In</button> */}
        <div className={styles.signUp}>
          <p className={styles.question}>
            Don’t have an account?
          </p>
          <p className={styles.create}>
            Create account
          </p>
        </div>
        <div className={styles.dividerBottom} />
      </div>
    )
  }
}

export default connect(state => ({
  username: state.login.username,
  password: state.login.password,
  loader: state.loader,
  error: state.login.error
}))(LoginWithPasswordMobile)
