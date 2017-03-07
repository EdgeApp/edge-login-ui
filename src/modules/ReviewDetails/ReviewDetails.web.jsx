import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import { browserHistory } from 'react-router'
import Button from 'react-toolbox/lib/button'
import FontIcon from 'react-toolbox/lib/font_icon';

import { showSignInDetails, hideSignInDetails, showPasswordRecovery } from './ReviewDetails.action'
import { loginWithPassword } from '../Login/Login.middleware'

import AfterSignUpQuestion from './AfterSignUpQuestion.web'

import nextButton from 'theme/nextButton.scss'
import signinButton from 'theme/signinButton.scss'
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
    this.props.dispatch(showPasswordRecovery())
    // const { username, password } = this.props.details
    // this.props.dispatch(
    //   loginWithPassword(
    //     username,
    //     password,
    //     ( error, account) => {
    //       if (!error) {
    //         if (window.parent.loginCallback) {
    //           window.parent.loginCallback(null, account)
    //         }
    //       }
    //     }
    //   )
    // )
  }

  render () {
    const renderView = () => {
      if (this.props.view) {
        return(
          <div className={styles.container}>
            <div className={styles.section}>
              <p className={styles.credentials}>username: <b>{this.props.details.username}</b></p>
              <p className={styles.credentials}>pin: <b>{this.props.details.pin}</b></p>
              <p className={styles.credentials}>password: <b>{this.props.details.password}</b></p>
            </div>
            <div className={styles.buttonSection}>
              <Button className={styles.buttonBlue} type='button' raised primary onClick={this._handleHideDetails}>{t('fragment_setup_writeitdown_hide')}</Button>
              <Button className={styles.buttonGreen} type='button' raised theme={nextButton} onClick={this._handleAfterSignupQuestion}>{t('string_finish')}</Button>
            </div>
          </div>
        )
      }

      if (!this.props.view) {
        return(
          <div className={styles.container}>
            <div className={styles.warningSection}>
              <p className={styles.paragraph1}>{t('fragment_setup_writeitdown_text')}</p>
              <br />
              <p className={styles.paragraph2}>{t('fragment_setup_writeitdown_text_warning')}</p>
            </div>
            <div className={styles.buttonSection}>
              <Button className={styles.buttonBlue} type='button' raised primary onClick={this._handleShowDetails}>{t('fragment_setup_writeitdown_show')}</Button>
              <Button className={styles.buttonGreen} type='button' raised theme={nextButton} onClick={this._handleAfterSignupQuestion}>{t('string_finish')}</Button>
            </div>
          </div>
        )
      }
    }

    return (
      <div>
        {renderView()}
        <AfterSignUpQuestion />
      </div>
    )
  }

}

export default connect(state => ({

  details: state.reviewDetails.details,
  view: state.reviewDetails.view

}))(Review)
