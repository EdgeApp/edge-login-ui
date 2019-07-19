import React from 'react'

import t from '../lib/LocaleStrings.js'
import style from '../styles/LayoutScreenHeader.scss'

export default ({ history, location }) => {
  return (
    <div className={style.container}>
      <div
        className={
          location === 'login' ? style.screenActive : style.screenInactive
        }
        onClick={location === 'signup' ? () => history.push('/login') : null}
      >
        <p className={style.text}>{t('headers_navigation_login')}</p>
      </div>
      <div
        className={
          location === 'signup' ? style.screenActive : style.screenInactive
        }
        onClick={location === 'login' ? () => history.push('/signup') : null}
      >
        <p className={style.text}>{t('headers_navigation_signup')}</p>
      </div>
    </div>
  )
}
