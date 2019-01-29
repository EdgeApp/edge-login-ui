import React from 'react'

import t from '../../../lib/web/LocaleStrings.js'
import styles from './LoginEdge.mobileStyle.scss'
import QRCode from './QRCode.js'

export default ({
  view,
  dispatch,
  edgeId,
  toggleQRCode,
  goToSignupPage,
  showMobilePasswordView
}) => {
  const renderQRCode = () => {
    if (view) {
      return (
        <div className={styles.qrCode}>
          <QRCode edgeId={edgeId} />
          <p className={styles.text}>Scan using Edge wallet to login</p>
        </div>
      )
    }
    return null
  }
  const renderRectangle = () => {
    if (!view) {
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://airbitz.co/elf/?address=${edgeId}`}
          className={styles.rectangle}
        >
          <p className={styles.text}>
            {t('string_scan_barcode_edge_question')}
            <br />
            {t('string_scan_barcode_edge_tap')}
          </p>
        </a>
      )
    }
    return null
  }
  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <div className={styles.navBoxActive}>
          <p className={styles.text}>Edge Login</p>
        </div>
        <div className={styles.navBox} onClick={showMobilePasswordView}>
          <p className={styles.text}>Username Login</p>
        </div>
      </div>
      {renderRectangle()}
      {renderQRCode()}
      <p className={styles.QRTextToggle} onClick={toggleQRCode}>
        {view
          ? t('string_new_account_show_code')
          : t('string_new_account_hide_code')}
      </p>
      <div className={styles.divider} />
      <div className={styles.signUp}>
        <p className={styles.question}>Don’t have an account?</p>
        <p className={styles.create} onClick={goToSignupPage}>
          Create account
        </p>
      </div>
      <div className={styles.dividerBottom} />
    </div>
  )
}
