// @flow
import React, { Component } from 'react'
import MdClose from 'react-icons/lib/md/close'
import MediaQuery from 'react-responsive'
import { sprintf } from 'sprintf-js'

import t from '../../../lib/LocaleStrings'
// react-icons/lib/md/close

type Props = {
  onClose(): void,
  vendorName?: string,
  location?: string
}

export default class Header extends Component<Props> {
  headerText = () => {
    const name = this.props.vendorName || ''
    switch (this.props.location) {
      case '/account':
        return 'Manage your ' + name + ' account'
      case '/changepin':
        return 'Change your 4-digit PIN'
      case '/changepassword':
        return 'Change your password'
      case '/passwordrecovery':
        return 'Password Recovery Setup'
      default:
        return sprintf(t('fragment_setup_header_left'), name || 'your account')
    }
  }

  render () {
    const image =
      this.props.vendorImage ||
      'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png'
    return (
      <section>
        <MediaQuery minWidth={720}>
          <div className="header">
            <div className="headerLeft" />
            <div className="headerCenter">
              <p>
                <img src={image} className="headerIcon" />
              </p>
              <p className="headerText">{this.headerText()}</p>
            </div>
            <div className="headerRight">
              <div className="headerCloseButton">
                <MdClose size={30} onClick={this.props.onClose} />
              </div>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <div className="header">
            <div className="headerLeft" />
            <div className="headerCenter">
              <p>
                <img src={image} className="headerIcon" />
              </p>
              <p className="headerText">{'headerText(location.pathname)'}</p>
            </div>
            <div className="headerRight">
              <div className="headerCloseButton">
                <MdClose size={30} onClick={this.props.onClose} />
              </div>
            </div>
          </div>
        </MediaQuery>
      </section>
    )
  }
}
/* export default ({ location }) => {
  const headerText = pathname => {
    const name = window.abcui.vendorName
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
        return 'allen ' // sprintf(t('fragment_setup_header_left'), name)
    }
  }
  return (
    <section>
      <MediaQuery minWidth={720}>
        <div className={webStyles.container}>
          <p>
            <img src={window.abcui.vendorImageUrl} className={webStyles.icon} />
          </p>
          <p className={webStyles.text}>{headerText(location.pathname)}</p>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={719}>
        <div className={mobileStyles.container}>
          <p>
            <img
              src={window.abcui.vendorImageUrl}
              className={mobileStyles.icon}
            />
          </p>
          <p className={mobileStyles.text}>{headerText(location.pathname)}</p>
        </div>
      </MediaQuery>
    </section>
  )
} */
