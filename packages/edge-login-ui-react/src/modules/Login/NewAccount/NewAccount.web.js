import React from 'react'

import styles from './NewAccount.webStyle.scss'

export default ({
  goToSignupPage,
  handleOpenLoginWithPasswordPage,
  handleOpenLoginWithEdgePage
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={window.abcui.vendorImageUrl} className={styles.logo} />
      </div>
      <div className={styles.createAccountButtonContainer}>
        <button className={styles.button} onClick={goToSignupPage}>
          Create Account
        </button>
        <br />
        <p className={styles.accountText}>
          Already have an account?{' '}
          <span
            className={styles.linkSignUp}
            onClick={handleOpenLoginWithPasswordPage}
          >
            Sign In
          </span>
        </p>
      </div>
      <button className={styles.button} onClick={handleOpenLoginWithEdgePage}>
        Login With Edge
      </button>
    </div>
  )
}
