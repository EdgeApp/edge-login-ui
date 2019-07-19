import React, { Component } from 'react'
import { sprintf } from 'sprintf-js'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/ModalAccountCacheDelete.scss'
import ActionButtons from './LayoutActionButtons'

export default class ModalAccountCacheDelete extends Component {
  render () {
    return (
      <section className={styles.container}>
        <p className={styles.headerText}>
          {sprintf(t('modal_account_cache_delete_header'), this.props.name)}
        </p>
        <p className={styles.text}>{t('modal_account_cache_delete_text')}</p>
        <ActionButtons
          leftText={t('modal_account_cache_delete_leftButtonText')}
          onLeftClick={this.props.closeModalAccountCacheDelete}
          rightText={t('modal_account_cache_delete_rightButtonText')}
          onRightClick={() => this.props.deleteUserFromCache(this.props.name)}
          usage="danger"
        />
      </section>
    )
  }
}
