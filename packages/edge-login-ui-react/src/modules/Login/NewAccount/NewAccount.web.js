import React from 'react'

import styles from './NewAccount.webStyle.scss'

export default ({ goToSignupPage, handleOpenLoginWithPasswordPage }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={goToSignupPage}>
        Create Account
      </button>
      <br />
      <p>
        Already have an account?{' '}
        <span className={styles.link} onClick={handleOpenLoginWithPasswordPage}>
          Login
        </span>
      </p>
    </div>
  )
}
