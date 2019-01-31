import React from 'react'

import t from '../../../lib/web/LocaleStrings.js'
import styles from './LoginEdge.webStyle.scss'
import QRCode from './QRCode.js'

export default ({ edgeId }) => (
  <div className={styles.container}>
    <p className={styles.header}>
      {t('string_scan_barcode_edge_question')}
      <br />
      {t('string_scan_barcode_edge_scan')}
    </p>
    <QRCode edgeId={edgeId} />
  </div>
)
