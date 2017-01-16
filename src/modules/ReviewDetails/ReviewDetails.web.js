import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import { browserHistory } from 'react-router'

import { showSignInDetails, hideSignInDetails } from './ReviewDetails.action'
import { loginWithPassword } from '../Login/Login.middleware'

import ErrorModal from '../ErrorModal/ErrorModal.web'
import Loader from '../Loader/Loader.web'

class Review extends Component {

  _handleHideDetails = () => {
    if (this.props.view) {
      this.props.dispatch(hideSignInDetails())
    }
  }

  _handleShowDetails = () => {
    if (!this.props.view) {
      this.props.dispatch(showSignInDetails())
    }
  }

  _handleFinish = () => {
    const { username, password } = this.props.details
    this.props.dispatch(
      loginWithPassword(
        username, 
        password, 
        () => browserHistory.push('/home')
      )
    )
  }

  render () {
    if (this.props.view) {
      return (
        <div>
          <div>
            <p>username: {this.props.details.username}</p> 
            <p>pin: {this.props.details.pin}</p> 
            <p>password: {this.props.details.password}</p> 
          </div>
          <div>
            <button type="button" onClick={this._handleHideDetails}>{t('fragment_setup_writeitdown_hide')}</button>
            <button type="button" onClick={this._handleFinish}>{t('string_finish')}</button>
          </div>
          <ErrorModal />
          <Loader />
        </div>
      )
    }

    if (!this.props.view) {
      return (
        <div>
          <div>
            <h5>{t('fragment_setup_writeitdown_text')}</h5> 
            <p>{t('fragment_setup_writeitdown_text_warning')}</p> 
          </div>
          <div>
            <button type="button" onClick={this._handleShowDetails}>{t('fragment_setup_writeitdown_show')}</button>
            <button type="button" onClick={this._handleFinish}>{t('string_finish')}</button>
          </div>
          <ErrorModal />
          <Loader />
        </div>
      )
    }
  }
}

export default connect(state => ({

  details: state.reviewDetails.details,
  view: state.reviewDetails.view

}))(Review)
