import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from 'react-toolbox/lib/input'
import t from 'lib/web/LocaleStrings'

import { checkUsername } from './Username.middleware'
import { changeUsernameValue } from './Username.action'
import { changeSignupPage } from '../Signup/Signup.action'

import styles from './Username.mobileStyle.scss'

class Username extends Component {
  _handleSubmit = () => {
    return this.props.dispatch(
      checkUsername(
        this.props.username,
        () => this.props.dispatch(changeSignupPage('pin'))
      )
    )
  }

  _handleBack = () => {
    if (this.props.loader.loading === false) {
      this.props.router.goBack()
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

  render () {
    return (
      <div onKeyPress={this._handleKeyEnter.bind(this)} className={styles.container}>
        <p className={styles.header}>{t('fragment_setup_username_label')}</p>
        <Input
          autoFocus
          type='text'
          name='username'
          onChange={this._handleOnChangeText}
          onKeyPress={this._handleKeyEnter.bind(this)}
          value={this.props.username}
          label={t('fragment_landing_username_hint')}
          className={styles.inputField}
        />
        <ul className={styles.list}>
          <li><p className={styles.bullet}>This is not your email or real name.</p></li>
          <li><p className={styles.bullet}>This is the username to login into your account on this and other devices.</p></li>
          <li><p className={styles.bullet}>Your username and password are known only to you and never stored unencrypted.</p></li>
        </ul>
        <div className={styles.rowButtonsHorizontalMobile}>
          <button className={styles.primaryMobile} onClick={this._handleSubmit}>Next</button>
          <button className={styles.secondaryMobile} onClick={this._handleBack}>Back</button>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  username: state.username.username,
  error: state.username.error,
  loader: state.loader
}))(Username)
