import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import Button from 'react-toolbox/lib/button'

import { showSignInDetails, hideSignInDetails, showPasswordRecovery } from './ReviewDetails.action'
import { closeLoading } from '../Loader/Loader.action'
import { loginWithPassword } from '../Login/Login.middleware'

import AfterSignUpQuestion from './AfterSignUpQuestion.web'
import PasswordRecovery from '../PasswordRecovery/PasswordRecovery.web'
import PasswordRecoverySuccess from '../PasswordRecovery/PasswordRecoverySuccess.web'

import nextButton from 'theme/nextButton.scss'
import styles from './ReviewDetails.webStyle'

class Review extends Component {
  _handleHideDetails = () => {
    if (this.props.view) {
      this.props.dispatch(hideSignInDetails())
    }
  }

  _handleShowDetails = () => {
    if (!this.props.view) {
      this.props.dispatch(showSignInDetails())
    }
  }

  _handleAfterSignupQuestion = () => {
    if (!this.props.user.username) {
      const { username, password } = this.props.details
      this.props.dispatch(
        loginWithPassword(
          username,
          password,
          (error, account) => {
            if (!error) {
              this.props.dispatch(closeLoading())
              return this.props.dispatch(showPasswordRecovery())
            }
          }
        )
      )
    }

    if (this.props.user.username) {
      this.props.dispatch(showPasswordRecovery())
    }
  }

  render () {
    const renderView = () => {
      if (this.props.view) {
        return (
          <div className={styles.container}>
            <div className={styles.section}>
              <p className={styles.credentials}>{t('string_username_with_colon')} {this.props.details.username}</p>
              <p className={styles.credentials}>{t('string_pin_with_colon')} {this.props.details.pin}</p>
              <p className={styles.credentials}>{t('string_password_with_colon')} {this.props.details.password}</p>
            </div>
            <div className={styles.buttonSection}>
              <Button className={styles.buttonShow} type='button' raised onClick={this._handleHideDetails}>{t('fragment_setup_writeitdown_hide')}</Button>
              <Button ref={(finish) => this.finishButton} className={styles.button} type='button' raised primary theme={nextButton} onClick={this._handleAfterSignupQuestion}>{t('string_finish')}</Button>
            </div>
          </div>
        )
      }

      if (!this.props.view) {
        return (
          <div className={styles.container}>
            <div className={styles.warningSection}>
              <p className={styles.paragraph1}>{t('fragment_setup_writeitdown_text')}</p>
              <br />
              <p className={styles.paragraph2}>{t('fragment_setup_writeitdown_text_warning')}</p>
            </div>
            <div className={styles.buttonSection}>
              <Button autoFocus className={styles.buttonShow} type='button' onClick={this._handleShowDetails}>{t('fragment_setup_writeitdown_show')}</Button>
              <Button className={styles.button} type='button' raised primary theme={nextButton} onClick={this._handleAfterSignupQuestion}>{t('string_finish')}</Button>
            </div>
          </div>
        )
      }
    }

    return (
      <div>
        {renderView()}
        <AfterSignUpQuestion />
        <PasswordRecovery location={this.props.location} />
        <PasswordRecoverySuccess />
      </div>
    )
  }
}

export default connect(state => ({

  details: state.reviewDetails.details,
  user: state.user,
  view: state.reviewDetails.view

}))(Review)
