import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import Dialog from 'react-toolbox/lib/dialog'
import { withRouter } from 'react-router'

import { hidePasswordRecovery } from './ReviewDetails.action'
import { showPasswordRecoveryView } from '../PasswordRecovery/PasswordRecovery.action'
import { loginWithPassword } from '../Login/Login.middleware'
import { closeLoading } from '../Loader/Loader.action'

const abcuiContext = window.parent.abcuiContext
const vendorName = abcuiContext ? abcuiContext.vendorName : null

import neutralButtons from 'theme/neutralButtons.scss'
import primaryButtons from 'theme/primaryButtons.scss'

class Review extends Component {
  _handleHideModal = () => {
    this.props.dispatch(
      hidePasswordRecovery()
    )
  }

  _handleFinish = () => {
    const { username, password } = this.props.details
    this.props.dispatch(
      loginWithPassword(
        username,
        password,
        (error, account) => {
          if (!error) {
            if (window.parent.loginCallback) {
              window.parent.loginCallback(null, account)
            }
            if (!window.parent.loginCallback) {
              this.props.dispatch(closeLoading())
              this.props.router.push('/home')
            }
          }
        }
      )
    )
  }

  _handleOpenPasswordRecovery = () => {
    this.props.dispatch(
      showPasswordRecoveryView()
    )
  }

  actions = [
    { label: t('fragment_recovery_account_setup_recovery'), theme: primaryButtons, onClick: this._handleOpenPasswordRecovery, raised: true, primary: true },
    { label: t('password_check_check_later'), onClick: this._handleFinish, theme: neutralButtons }
  ]

  render () {
    return (
        <Dialog
          actions={this.actions}
          active={this.props.view}
          onEscKeyDown={this._handleHideModal}
          onOverlayClick={this._handleHideModal}
          title={t('activity_recovery_account_created')}
        >
          <p>{ String.format(t('fragment_recovery_account_created_fragment_1'), vendorName || 'Airbitz') }</p>
          <br />
          <p>{ String.format(t('fragment_recovery_account_created_fragment_2'), vendorName || 'Airbitz') }</p>
          <br />
          <p>{ t('fragment_recovery_account_created_fragment_3') }</p>
        </Dialog>
    )
  }
}

const ReviewWithRouter = withRouter(Review)
const ReviewWithRedux = connect(state => ({

  details: state.reviewDetails.details,
  view: state.reviewDetails.afterQuestionPasswordRecoveryView

}))(ReviewWithRouter)

export default ReviewWithRedux
