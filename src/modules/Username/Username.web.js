import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import nextButton from 'theme/nextButton.scss'
import backButton from 'theme/backButton.scss'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import t from 'lib/web/LocaleStrings'

import { checkUsername } from './Username.middleware'
import { changeUsernameValue } from './Username.action'
import { changeSignupPage } from '../Signup/Signup.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'

import neutral from 'theme/neutralButtonWithBlueText.scss'
import styles from './Username.webStyle'

class UsernameComponent extends Component {

  _handleSubmit = (e) => {
    e.preventDefault()

    if (this.props.username.length < 3) {
      return this.props.dispatch(
        openErrorModal(t('activity_signup_insufficient_username_message'))
      )
    }

    if (this.props.username.length >= 3) {
      return this.props.dispatch(
        checkUsername(
          this.props.username,
          () => this.props.dispatch(changeSignupPage('pin'))
        )
      )
    }
  }

  _handleBack = () => {
    if (this.props.loader.loading === false) {
      this.props.router.goBack()
    }
  }

  _handleOnChangeText = (username) => {
    this.props.dispatch(
      changeUsernameValue(username)
    )
  }

  render () {
    return (
      <div>
        <div style={{position: 'relative'}}>
          <Button theme={neutral} className={styles.exitButton} onClick={this._handleBack}>{t('string_capitalize_exit')}</Button>
          <div className={styles.title}>
            <h4>{t('fragment_setup_username_label')}</h4>
          </div>
        </div>
          <div className={styles.section}>
            <form onSubmit={e => this._handleSubmit(e)}>
              <Input
                autoFocus
                type="text"
                name="username"
                onChange={this._handleOnChangeText}
                value={this.props.username}
                label={t('fragment_landing_username_hint')}
                className={styles.inputField}
              />
            </form>
          </div>
          <div className={styles.section}>
            <p className={styles.usernameText}>{t('fragment_setup_username_text')}</p>
          </div>
          <div className={styles.buttonSection}>
            <Button type="button" raised theme={nextButton} onClick={this._handleSubmit}>{t('string_next')}</Button>
          </div>
      </div>
    )
  }
}

UsernameComponent = withRouter(UsernameComponent)
UsernameComponent = connect(state => ({

  username: state.username,
  loader: state.loader

}))(UsernameComponent)

export default UsernameComponent
