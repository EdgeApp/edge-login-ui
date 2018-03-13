import React from 'react'
import MediaQuery from 'react-responsive'

import mobileStyles from './Divider.mobileStyle.scss'
import webStyles from './Divider.webStyle.scss'

export default () => (
  <section>
    <MediaQuery minWidth={720}>
      <div className={webStyles.divider}>
        <div className={webStyles.line} />
        <div className={webStyles.circle}>
          <p className={webStyles.or}>or</p>
        </div>
      </div>
    </MediaQuery>
    <MediaQuery maxWidth={719}>
      <div className={mobileStyles.divider}>
        <div className={mobileStyles.line} />
        <div className={mobileStyles.circle}>
          <p className={mobileStyles.or}>or</p>
        </div>
      </div>
    </MediaQuery>
  </section>
)
