import React, { Component } from 'react'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/ModalAccountPasswordCheck.scss'
import NavigationButtons from './LayoutNavigationButtons'

export default class ModalAccountCacheDelete extends Component {
  handleSubmit = () => {
    const callback = error => {
      if (error) {
        return this.props.handleError(error)
      }
      this.props.closeAcountPasswordCheckModal()
      return this.props.openAccountScreen(this.props.route)
    }
    return this.props.checkPassword(
      this.props.password,
      this.props.user,
      callback
    )
  }

  passwordKeyPressed = e => {
    if (e.charCode === 13) {
      return this.handleSubmit()
    }
  }

  componentWillUnmount() {}
  render() {
    return (
      <section className={styles.container}>
        <p className={styles.subHeaderText}>
          {t('modal_account_password_check_header')}
        </p>
        <form onSubmit={e => e.preventDefault()}>
          <label className={this.props.loading ? styles.lableDisabled : null}>
            {t('label_current_password')}
          </label>
          <input
            type="password"
            name="password"
            value={this.props.password}
            onChange={e => this.props.changePassworValue(e.target.value)}
            onKeyPress={this.passwordKeyPressed}
            disabled={this.props.loading}
            autoFocus
          />
        </form>
        <NavigationButtons
          onLeftClick={this.props.closeAcountPasswordCheckModal}
          onRightClick={this.handleSubmit}
        />
      </section>
    )
  }
}
