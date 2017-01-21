import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import t from '../../lib/web/LocaleStrings'

import { showPinView, changePinPasswordValue, changePinValue } from './ChangePin.action'
import { checkPin } from './ChangePin.middleware'

class ChangePin extends Component {

  _handleSubmit = () => {
    const callback = () => browserHistory.push('/signup/review')
    this.props.dispatch(
      checkPin(
        this.props.password,
        this.props.pin,
        this.props.user,
        callback
      )
    )
  }

  _handleShowChangePin = (e) => {
    this.props.dispatch(showPinView())
  }

  _handleOnChangePinPassword = (e) => {
    const password = e.target.value
    this.props.dispatch(changePinPasswordValue(password))
  }

  _handleOnChangePin = (e) => {
    const pin = e.target.value
    this.props.dispatch(changePinValue(pin))
  }

  render () {
    if(this.props.view){
      return (
        <div>
          <div>
            <div>
              <input type="password" name="changePinPassword" onChange={this._handleOnChangePinPassword} value={this.props.password} placeholder="Current Password" />	
            </div>
            <div>
              <input type="number" name="changePin" onChange={this._handleOnChangePin} value={this.props.pin} placeholder="New Pin" />	
            </div>
            <div>
              <button type="button" onClick={this._handleSubmit}>Submit</button> 
            </div>
          </div>
        </div>
      )
    }
    if(!this.props.view){
      return (
        <div>
          <button type="button" onClick={this._handleShowChangePin}>Show</button>
        </div>
      )
    }
  }
}

export default connect( state => ({

  view      : state.changePin.view,
  password  : state.changePin.password,
  pin       : state.changePin.pin,
  user      : state.user

}) )(ChangePin)
