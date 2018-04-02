import React from 'react'

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
      <div className={styles.rectangle}>
        <p className={styles.text}>Edge vs Airbitz</p>
      </div>
      {renderQRCode()}
      <p className={styles.QRTextToggle} onClick={toggleQRCode}>
        {view ? 'Hide QR code' : 'Show QR code'}
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
