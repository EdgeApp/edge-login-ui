import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import { browserHistory } from 'react-router'

import { showSignInDetails, hideSignInDetails } from './ReviewDetails.action'
import { loginWithPassword } from '../Login/Login.middleware'

import ErrorModal from '../ErrorModal/ErrorModal.web'
import Loader from '../Loader/Loader.web'

import Button from 'react-toolbox/lib/button'
import { Card, CardText, CardActions } from 'react-toolbox/lib/card'
import nextButton from 'theme/nextButton.scss'

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
        () => browserHistory.push('/passwordRecovery')
      )
    )
  }

  render () {
    if (this.props.view) {
      return (
        <div>
          <Card>
            <CardText style={{height: '100px'}}>
              <p>username: {this.props.details.username}</p>
              <p>pin: {this.props.details.pin}</p>
              <p>password: {this.props.details.password}</p>
            </CardText>
            <CardActions>
              <Button type='button' raised primary onClick={this._handleHideDetails}>{t('fragment_setup_writeitdown_hide')}</Button>
            </CardActions>
            <CardActions>
              <Button type='button' raised theme={nextButton} onClick={this._handleFinish}>{t('string_finish')}</Button>
            </CardActions>
          </Card>
          <ErrorModal />
          <Loader />
        </div>
      )
    }

    if (!this.props.view) {
      return (
        <div>
          <Card>
            <CardText style={{height: '100px'}}>
              <h5>{t('fragment_setup_writeitdown_text')}</h5>
              <p>{t('fragment_setup_writeitdown_text_warning')}</p>
            </CardText>
            <CardActions>
              <Button type='button' raised primary onClick={this._handleShowDetails}>{t('fragment_setup_writeitdown_show')}</Button>
            </CardActions>
            <CardActions>
              <Button type='button' raised theme={nextButton} onClick={this._handleFinish}>{t('string_finish')}</Button>
            </CardActions>
          </Card>
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
