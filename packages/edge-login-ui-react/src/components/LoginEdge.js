import React, { Component } from 'react'
import { sprintf } from 'sprintf-js'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/LoginEdge.scss'
import NavigationButtons from './LayoutNavigationButtons'
import QRCode from './LoginEdgeQRCode.js'

export default class LoginEdge extends Component {
  constructor (props) {
    super(props)
    props.edgeLogin()
  }
  componentWillUnmount () {
    if (this.props.edgeObject) {
      return this.props.removeEdgePolling(this.props.edgeObject)
    }
  }
  render () {
    return (
      <section className={styles.rootContainer}>
        <div className={styles.container}>
          <p className={styles.headerText}>
            {sprintf(t('headers_login'), window.abcui.vendorName)}
          </p>
          {!this.props.edgeObject && (
            <p className={styles.header}>{t('login_edge_loading_qr')}</p>
          )}
          {!this.props.edgeObject && (
            <div className={styles.loaderContainer}>
              <div className={styles.loader} />
            </div>
          )}
          {this.props.edgeObject && (
            <p className={styles.header}>{t('login_edge_header')}</p>
          )}
          {this.props.edgeObject && (
            <QRCode edgeId={this.props.edgeObject.id} />
          )}
          {this.props.edgeObject && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.edge.app/edgelogin?address=${this.props.edgeObject.id}`}
              className={styles.launchEdgeLink}
            >
              <button className={styles.launchEdgeButton}>
                {t('login_edge_button')}
              </button>
            </a>
          )}
          <NavigationButtons onLeftClick={this.props.closeLoginEdgePage} />
        </div>
      </section>
    )
  }
}
