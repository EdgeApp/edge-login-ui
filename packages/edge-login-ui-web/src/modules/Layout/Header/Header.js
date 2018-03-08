import t from 'lib/web/LocaleStrings'
import React from 'react'
import MediaQuery from 'react-responsive'
import { sprintf } from 'sprintf-js'

import mobileStyles from './Header.mobileStyle.scss'
import webStyles from './Header.webStyle.scss'

export default ({ location }) => {
  const headerText = pathname => {
    const name = window.parent.abcui.vendorName || window.abcui.vendorName
    switch (pathname) {
      case '/account':
        return 'Manage your ' + name + ' account'
      case '/changepin':
        return 'Change your 4-digit PIN'
      case '/changepassword':
        return 'Change your password'
      case '/passwordrecovery':
        return 'Password Recovery Setup'
      default:
        return sprintf(t('fragment_setup_header_left'), name)
    }
  }
  return (
    <section>
      <MediaQuery minWidth={720}>
        <div className={webStyles.container}>
          <p>
            <img
              src={
                window.parent.abcui.vendorImageUrl ||
                window.abcui.vendorImageUrl
              }
              className={webStyles.icon}
            />
          </p>
          <p className={webStyles.text}>{headerText(location.pathname)}</p>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={719}>
        <div className={mobileStyles.container}>
          <p>
            <img
              src={
                window.parent.abcui.vendorImageUrl ||
                window.abcui.vendorImageUrl
              }
              className={mobileStyles.icon}
            />
          </p>
          <p className={mobileStyles.text}>{headerText(location.pathname)}</p>
        </div>
      </MediaQuery>
    </section>
  )
}
