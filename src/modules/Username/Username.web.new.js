import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import t from 'lib/web/LocaleStrings'

import Input from 'react-toolbox/lib/input'
import styles from './Username.webStyle.scss'

import { checkUsername } from './Username.middleware'
import { changeUsernameValue, error, clearError } from './Username.action'
import { changeSignupPage } from '../Signup/Signup.action'

class Username extends Component {
  _handleSubmit = () => {
    if (this.props.username.length < 3) {
      return this.props.dispatch(
        error('Username must be at least 3 characters')
      )
    }
    if (this.props.username.length >= 3) {
      return this.props.dispatch(
        checkUsername(
          this.props.username,
          (errorMessage) => {
            if (errorMessage) {
              return this.props.dispatch(error(errorMessage))
            }
            if (!errorMessage) {
              this.props.dispatch(clearError())
              return this.props.dispatch(changeSignupPage('pin'))
            }
          }
        )
      )
    }
  }
  _handleOnChangeText = (username, event, foo) => {
    this.props.dispatch(
      changeUsernameValue(username)
    )
  }
  _handleKeyEnter = (e) => {
    if (e.nativeEvent.charCode === 13) {
      return this._handleSubmit()
    }
  }
  _renderButtonRows = () => {
    if (!this.props.loader.loading) {
      return (
        <div className={styles.rowButtons}>
          <Link to='/login'>
            <button className={styles.secondary}>Back</button>
          </Link>
          <button className={styles.primary} onClick={this._handleSubmit}>Next</button>
        </div>
      )
    }
    if (this.props.loader.loading) {
      return (
        <div className={styles.rowButtons}>
          <button className={styles.secondaryLoad}>Back</button>
          <button className={styles.primaryLoad}><div className={styles.loader} /></button>
        </div>
      )
    }
  }
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Choose a Username</p>
        <Input
          autoFocus
          type='text'
          name='username'
          onChange={this._handleOnChangeText}
          onKeyPress={this._handleKeyEnter.bind(this)}
          value={this.props.username}
          label={t('fragment_landing_username_hint')}
          className={styles.input}
          error={this.props.error}
        />
        <div className={styles.bullets}>
          <p className={styles.bullet}><span className={styles.bulletIcon}>•</span> This is not your email or real name.</p>
          <p className={styles.bullet}><span className={styles.bulletIcon}>•</span> This is the username to login into your account on this and other devices.</p>
          <p className={styles.bullet}><span className={styles.bulletIcon}>•</span> Your username and password are known only to you and never stored unencrypted.</p>
        </div>
        {this._renderButtonRows()}
      </div>
    )
  }
}

export default connect(state => ({
  username: state.username.username,
  error: state.username.error,
  loader: state.loader
}))(Username)
