import React, { Component } from 'react'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/SignupUsername.scss'
import NavigationButtons from './LayoutNavigationButtons'
import ScreenHeader from './LayoutScreenHeader'

export default class SignupUsername extends Component {
  handleSubmit = () => {
    const { username } = this.props
    if (username.length < 3) {
      return this.props.handleError(t('signup_username_username_error_minimum'))
    }
    if (username.length >= 3) {
      const callback = errorMessage => {
        if (errorMessage) {
          return this.props.handleError(errorMessage)
        }
        if (!errorMessage) {
          return this.props.openSignupPinPage()
        }
      }
      return this.props.handleSubmit(username, callback)
    }
  }
  onKeyEnter = e => {
    if (e.nativeEvent.charCode === 13) {
      return this.handleSubmit()
    }
  }
  render () {
    return (
      <section className={styles.rootContainer}>
        <ScreenHeader location={'signup'} history={this.props.history} />
        <div className={styles.container}>
          <p className={styles.headerText}>{t('signup_welcome')}</p>
          <p className={styles.subHeaderText}> {t('signup_username_header')}</p>
          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <label className={this.props.loading ? styles.lableDisabled : null}>
              {t('label_username')}
            </label>
            <input
              type="text"
              name="user"
              ref="user"
              value={this.props.username}
              onChange={this.props.changeUsernameValue}
              onKeyPress={this.onKeyEnter}
              disabled={this.props.loading}
            />
          </form>
          <ul className={styles.bulletText}>
            <li>
              <p>{t('signup_username_text1')}</p>
            </li>
            <li>
              <p>{t('signup_username_text2')}</p>
            </li>
            <li>
              <p>{t('signup_username_text3')}</p>
            </li>
          </ul>
          <div className={styles.loader} />
          <NavigationButtons
            onRightClick={this.handleSubmit}
            loading={this.props.loading}
          />
        </div>
      </section>
    )
  }
}
