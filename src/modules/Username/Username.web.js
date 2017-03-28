import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import t from 'lib/web/LocaleStrings'

import { checkUsername } from './Username.middleware'
import { changeUsernameValue } from './Username.action'
import { changeSignupPage } from '../Signup/Signup.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import neutralButtonWithBlueTextTheme from 'theme/neutralButtonWithBlueText.scss'

import styles from './Username.webStyle'

class UsernameComponent extends Component {
  _handleSubmit = () => {
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
      <div onKeyPress={this._handleKeyEnter.bind(this)}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h4>{t('fragment_setup_username_label')}</h4>
          </div>
        </div>
          <div className={styles.section}>
          <Input
            autoFocus
            type="text"
            name="username"
            onChange={this._handleOnChangeText}
            onKeyPress={this._handleKeyEnter.bind(this)}
            value={this.props.username}
            label={t('fragment_landing_username_hint')}
            className={styles.inputField}
          />
          </div>
          <div className={styles.section}>
            <p className={styles.text}>{t('fragment_setup_username_text')}</p>
          </div>
          <div className={styles.buttonSection}>
            <Button theme={neutralButtonWithBlueTextTheme} onClick={this._handleBack}>{t('string_capitalize_back')}</Button>
            <Button type="button" raised primary className={styles.buttonNext} onClick={this._handleSubmit}>{t('string_next')}</Button>
          </div>
      </div>
    )
  }
}

const UsernameComponentWithRouter = withRouter(UsernameComponent)
const UsernameComponentWithRedux = connect(state => ({

  username: state.username,
  loader: state.loader

}))(UsernameComponentWithRouter)

export default UsernameComponentWithRedux
