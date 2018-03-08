import t from 'lib/web/LocaleStrings'
import React from 'react'

import styles from './LoginEdge.mobileStyle.scss'
import QRCode from './QRCode.js'

export default ({
  view,
  dispatch,
  edgeId,
  edgeUsername,
  edgeAccount,
  edgeObject,
  toggleQRCode,
  goToSignupPage,
  showMobilePasswordView
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
          <p className={styles.text}>Scan using Airbitz wallet to login</p>
        </div>
      )
    }
    if (!view) {
      return null
    }
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
      <div className={styles.rectangle}>
        <p className={styles.text}>
          {t('string_scan_barcode_to_register')}
          <br />
          {t('string_scan_barcode_edge_wallet')}
        </p>
      </div>
      {renderQRCode()}
      <p className={styles.QRTextToggle} onClick={toggleQRCode}>
        {view ? 'Hide QR code' : 'Show QR code'}
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
