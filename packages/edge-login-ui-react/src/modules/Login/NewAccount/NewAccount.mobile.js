import React from 'react'

import t from '../../../lib/web/LocaleStrings.js'
import Divider from '../Divider/Divider.js'
import QRCode from '../LoginEdge/QRCode.js'
import styles from './NewAccount.mobileStyle.scss'

export default ({
  view,
  dispatch,
  edgeId,
  edgeUsername,
  edgeAccount,
  edgeObject,
  goToSignupPage,
  handleOpenLoginWithPasswordPage,
  toggleQRCode
}) => {
  const renderQRCode = () => {
    if (view) {
      return (
        <div className={styles.qrCode}>
          <QRCode
            dispatch={dispatch}
            edgeId={edgeId}
            edgeUsername={edgeUsername}
            edgeAccount={edgeAccount}
            edgeObject={edgeObject}
          />
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
      {renderRectangle()}
      {renderQRCode()}
      <p className={styles.QRTextToggle} onClick={toggleQRCode}>
        {view
          ? t('string_new_account_show_code')
          : t('string_new_account_hide_code')}
      </p>
      <Divider />
      <button className={styles.createButton} onClick={goToSignupPage}>
        Create Account
      </button>
      <p className={styles.alreadyAccount}>
        Already have an account?{' '}
        <span className={styles.link} onClick={handleOpenLoginWithPasswordPage}>
          Log in
        </span>
      </p>
    </div>
  )
}
