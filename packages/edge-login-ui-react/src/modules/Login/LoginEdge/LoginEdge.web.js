import React from 'react'

import t from '../../../lib/web/LocaleStrings.js'
import styles from './LoginEdge.webStyle.scss'
import QRCode from './QRCode.js'

export default ({ edgeId, goToSignupPage, closeEdgeLoginView }) => (
  <div className={styles.container}>
    <p className={styles.header}>{t('string_scan_barcode_to_signin_full')}</p>
    <QRCode edgeId={edgeId} />
    <a
      className={styles.launchAppButton}
      target="_blank"
      rel="noopener noreferrer"
      href={edgeId ? `https://www.edge.app/edgelogin?address=${edgeId}` : null}
    >
      Launch Edge Wallet
    </a>
    <p className={styles.linkText}>
      Don't have an account?{' '}
      <span className={styles.linkSignUp} onClick={goToSignupPage}>
        Sign Up
      </span>
    </p>
    <button className={styles.secondary} onClick={closeEdgeLoginView}>
      Back
    </button>
  </div>
)
