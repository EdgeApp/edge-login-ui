import t from 'lib/web/LocaleStrings'
import React from 'react'
import Input from 'react-toolbox/lib/input'

import CachedUsers from '../CachedUsers/CachedUsers.js'
import styles from './LoginWithPassword.webStyle.scss'

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
  refUsername,
  refPassword,
  username,
  password,
  loader,
  error
}) => (
  <div className={styles.container}>
    <p className={styles.header}>{t('login_text')}</p>
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
            className={styles.usernameForm}
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
        error={error}
        className={styles.forms}
      />
    </div>
    <p className={styles.forgotPasswordLink} onClick={toggleForgotPassword}>
      Forgot Password
    </p>
    <button
      className={loader ? styles.primaryLoad : styles.primary}
      onClick={submit}
    >
      {loader ? <div className={styles.loader} /> : 'Sign In'}
    </button>
    <p className={styles.createAccountText}>
      Don&apos;t have an account?
      <span className={styles.link} onClick={goToSignupPage}>
        {' '}
        Create Account
      </span>
    </p>
  </div>
)
