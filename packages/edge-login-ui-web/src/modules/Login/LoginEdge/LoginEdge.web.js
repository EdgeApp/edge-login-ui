import t from 'lib/web/LocaleStrings'
import React from 'react'

import styles from './LoginEdge.webStyle.scss'
import QRCode from './QRCode.js'

export default ({
  view,
  dispatch,
  edgeId,
  edgeUsername,
  edgeAccount,
  edgeObject,
  toggleQRCode,
  goToSignupPage
}) => (
  <div className={styles.container}>
    <p className={styles.header}>
      {t('string_scan_barcode_to_signin')}
      <br />
      {t('string_scan_barcode_edge_wallet')}
    </p>
    <QRCode
      dispatch={dispatch}
      edgeId={edgeId}
      edgeUsername={edgeUsername}
      edgeAccount={edgeAccount}
      edgeObject={edgeObject}
    />
  </div>
)
