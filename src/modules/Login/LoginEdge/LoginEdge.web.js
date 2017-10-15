import React from 'react'
import t from 'lib/web/LocaleStrings'
import styles from './LoginEdge.webStyle.scss'
import QRCode from './QRCode.js'

export default ({
  view,
  edgeId,
  edgeUsername,
  edgeAccount,
  edgeObject,
  toggleQRCode,
  goToSignupPage
}) => {
  return (
    <div style={styles.container}>
      <p className={styles.header}>{t('string_scan_barcode_to_signin')}</p>
      <QRCode
        dispatch={this.props.dispatch}
        edgeId={this.props.edgeId}
        edgeUsername={this.props.edgeUsername}
        edgeAccount={this.props.edgeAccount}
        edgeObject={this.props.edgeObject}
      />
    </div>
  )
}
