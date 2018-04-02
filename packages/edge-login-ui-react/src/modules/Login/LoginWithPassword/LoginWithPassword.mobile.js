import React from 'react'
import Input from 'react-toolbox/lib/input'

import CachedUsers from '../CachedUsers/CachedUsers.js'
import styles from './LoginWithPassword.mobileStyle.scss'

export default ({
  submit,
  goToSignupPage,
  hideCachedUsers,
  showCachedUsers,
  passwordKeyPress,
  usernameKeyPress,
  changeUsernameValue,
  changePasswordValue,
  toggleForgotPassword,
  toggleMobileLoginView,
  refUsername,
  refPassword,
  username,
  password,
  loader,
  error
}) => (
  <div className={styles.container}>
    <div className={styles.navigation}>
      <div className={styles.navBox} onClick={toggleMobileLoginView}>
        <p className={styles.text}>Edge Login</p>
      </div>
      <div className={styles.navBoxActive}>
        <p className={styles.text}>Username Login</p>
      </div>
    </div>
    <p className={styles.header}>
      Log in with your username and <br />password
    </p>
    <div className={styles.forms}>
      <CachedUsers
        component={
          <Input
            type="text"
            label="Username"
            name="username"
            onKeyPress={usernameKeyPress}
            onChange={changeUsernameValue}
            value={username}
            ref={refUsername}
            onFocus={showCachedUsers}
            onBlur={hideCachedUsers}
          />
        }
        area="passwordLogin"
        containerClassName={styles.cachedUsers}
        userListClassName={styles.userListClassName}
      />
      <Input
        type="password"
        label="Password"
        name="password"
        onKeyPress={passwordKeyPress}
        onChange={changePasswordValue}
        value={password}
        ref={refPassword}
        className={styles.form}
        error={error}
      />
    </div>
    <p className={styles.forgotPassword} onClick={toggleForgotPassword}>
      Forgot Password
    </p>
    <button
      className={loader ? styles.primaryLoadMobile : styles.primaryMobile}
      onClick={submit}
    >
      {loader ? <div className={styles.loader} /> : 'Sign In'}
    </button>
    <div className={styles.signUp}>
      <p className={styles.question}>Don’t have an account?</p>{' '}
      <p className={styles.create} onClick={goToSignupPage}>
        {' '}
        Create account{' '}
      </p>
    </div>
    <div className={styles.dividerBottom} />
  </div>
)
