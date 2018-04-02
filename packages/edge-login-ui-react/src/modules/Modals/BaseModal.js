import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import Dialog from 'react-toolbox/lib/dialog'

import mobileStyles from './BaseModal.mobileStyle.scss'
import desktopStyles from './BaseModal.webStyle.scss'

export default class BaseModal extends Component {
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Dialog
            className={desktopStyles.container}
            active={this.props.active}
            onEscKeyDown={this.props.close}
            onOverlayClick={this.props.close}
          >
            <div className={desktopStyles.circle}>
              <img src={this.props.icon} />
            </div>
            <div className={desktopStyles.main}>{this.props.children}</div>
          </Dialog>
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Dialog
            className={mobileStyles.container}
            active={this.props.active}
            onEscKeyDown={this.props.close}
            onOverlayClick={this.props.close}
          >
            <div className={mobileStyles.circle}>
              <img src={this.props.icon} />
            </div>
            <div className={mobileStyles.main}>{this.props.children}</div>
          </Dialog>
        </MediaQuery>
      </section>
    )
  }
}
