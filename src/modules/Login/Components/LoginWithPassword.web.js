import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from 'lib/web/LocaleStrings'

import styles from './LoginWithPassword.webStyle.scss'
import Input from 'react-toolbox/lib/input'

import { loginUsername, loginPassword, openUserList, closeUserList } from '../Login.action.js'
import PasswordRecovery from '../../Modals/PasswordRecovery/PasswordRecovery.web.js'
import CachedUsers from '../../CachedUsers/CachedUsers.web.js'

import { openPasswordRecoveryModal } from '../../Modals/PasswordRecovery/PasswordRecovery.action.js'

class LoginWithPassword extends Component {
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
    console.log('fofof')
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
          autoFocus
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
        <p className={styles.header}>{t('login_text')}</p>
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
        <p className={styles.link} onClick={e => dispatch(openPasswordRecoveryModal())}>Forgot Password</p>
        <div style={{ height: '15px' }} />
        <button
          className={this.props.loader.loading ? styles.primaryLoad : styles.primary}
          onClick={e => this.props.login(username, password)}
        >
          { this.props.loader.loading ? <div className={styles.loader} /> : 'Sign In' }
        </button>
        <div style={{ height: '15px' }} />
        <p>Already have an account? <span className={styles.link} onClick={this.props.signup}>Create Account</span></p>
        <PasswordRecovery />
      </div>
    )
  }
}

export default connect(state => ({
  username: state.login.username,
  password: state.login.password,
  loader: state.loader,
  error: state.login.error
}))(LoginWithPassword)
