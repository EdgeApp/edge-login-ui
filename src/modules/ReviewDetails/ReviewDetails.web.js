import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'

import { showSignInDetails, hideSignInDetails } from './ReviewDetails.action'
// import { loginWithPassword } from '../Login/Login.middleware'

import ErrorModal from '../ErrorModal/ErrorModal.web'
import Loader from '../Loader/Loader.web'

class Review extends Component {

  handleHideDetails = () => {
    if (this.props.review) {
      this.props.dispatch(hideSignInDetails())
    }
  }

  handleShowDetails = () => {
    if (!this.props.review) {
      this.props.dispatch(showSignInDetails())
    }
  }

  // handleFinish = () => {
  //   const { username, password } = this.props.details
  //   this.props.dispatch(loginWithPassword(username, password))
  //   Actions.home()
  // }

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
            <button type="button" onClick={this.handleHideDetails}>{t('fragment_setup_writeitdown_hide')}</button>
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
            <button type="button" onClick={this.handleShowDetails}>{t('fragment_setup_writeitdown_show')}</button>
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
