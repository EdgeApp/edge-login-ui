import React from 'react'
import { sprintf } from 'sprintf-js'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/ModalAccountCreated.scss'
import ActionButtons from './LayoutActionButtons'

export default ({ cancel, submit }) => {
  return (
    <section className={styles.container}>
      <p className={styles.headerText}>{t('modal_account_created_header')}</p>
      <p className={styles.subHeaderText}>
        {sprintf(
          t('modal_account_created_sub_header'),
          window.abcui.vendorName
        )}
      </p>
      <p className={styles.text1}>
        {sprintf(t('modal_account_created_text1'), window.abcui.vendorName)}
      </p>
      <p className={styles.text2}>{t('modal_account_created_text2')}</p>
      <ActionButtons
        leftText={t('modal_account_created_button_cancel')}
        onLeftClick={cancel}
        rightText={t('modal_account_created_button_success')}
        onRightClick={submit}
        usage="success"
      />
    </section>
  )
}
