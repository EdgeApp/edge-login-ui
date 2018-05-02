import React, { Component } from 'react'
import MediaQuery from 'react-responsive'

import logo from '../../../img/logo_edge_white.png'
import t from '../../../lib/LocaleStrings'
export default class Header extends Component<null> {
  render () {
    return (
      <section>
        <MediaQuery minWidth={780}>
          <div className="footer">
            <div className="footerLeft">
              <div>
                <img src={logo} />
              </div>
            </div>
            <div className="footerCenter">
              <p className="footerText">
                <a
                  href="https://edgesecure.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="airbitzLink"
                >
                  {t('fragment_setup_footer_1') +
                    t('fragment_setup_footer_2_link')}
                </a>
              </p>
            </div>
            <div className="footerRight">
              <p className="footerText">
                Powered by{' '}
                <a
                  href="https://edgesecure.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="airbitzLink"
                >
                  Edge
                </a>
              </p>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={779}>
          <div className="footerMobile">
            <p className="footerText">
              Powered by{' '}
              <a
                href="https://edgesecure.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="airbitzLink"
              >
                Edge
              </a>
            </p>
          </div>
        </MediaQuery>
      </section>
    )
  }
}
