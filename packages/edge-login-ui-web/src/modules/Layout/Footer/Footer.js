import React from 'react'
import MediaQuery from 'react-responsive'

import Mobile from './Footer.mobile.js'
import Desktop from './Footer.web.js'

export default () => (
  <section>
    <MediaQuery minWidth={720}>
      <Desktop />
    </MediaQuery>
    <MediaQuery maxWidth={719}>
      <Mobile />
    </MediaQuery>
  </section>
)
