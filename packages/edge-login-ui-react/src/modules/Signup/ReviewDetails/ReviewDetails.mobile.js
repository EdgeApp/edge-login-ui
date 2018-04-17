import React from 'react'
import FontIcon from 'react-toolbox/lib/font_icon'

import styles from './ReviewDetails.mobileStyle.scss'

export default ({
  view,
  details,
  toggleInfo,
  handleOpenAccountCreatedModal
}) => {
  const renderInfo = () => {
    if (view) {
      return (
        <p className={styles.shown}>
          <span className={styles.bold}>Username:</span> {details.username}{' '}
          <br />
          <span className={styles.bold}>Password:</span> {details.password}{' '}
          <br />
          <span className={styles.bold}>PIN:</span> {details.pin}
        </p>
      )
    }
    if (!view) {
      return <p className={styles.hidden}>Show my account info</p>
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.header}>
        Almost done! Let&apos;s write down your account information
      </p>
      <div className={styles.caution}>
        <div className={styles.icon}>
          <FontIcon className={styles.font} value="warning" />
        </div>
        <p>
          If you lose your account information, you’ll lose access to your funds
          permanently. Write down and store it securely.
        </p>
      </div>
      <div className={styles.infoBox} onClick={toggleInfo}>
        {view ? <FontIcon className={styles.close} value="clear" /> : null}
        <div className={styles.infoText}>{renderInfo()}</div>
      </div>
      <button
        className={styles.primaryMobile}
        onClick={handleOpenAccountCreatedModal}
      >
        Finish
      </button>
    </div>
  )
}
