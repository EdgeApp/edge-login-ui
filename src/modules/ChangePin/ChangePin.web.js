import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import t from '../../lib/web/LocaleStrings'

import { showPinView, changeOldPinValue, changeNewPinValue, changeNewPinRepeatValue } from './ChangePin.action'
import { checkPin } from './ChangePin.middleware'

class ChangePin extends Component {

  _handleSubmit = () => {
    const callback = () => browserHistory.push('/signup/review')
    this.props.dispatch(
      checkPin(
        this.props.oldPin,
        this.props.newPin,
        callback
      )
    )
  }

  _handleShowChangePin = (e) => {
    this.props.dispatch(showPinView())
  }

  _handleOnChangeOldPin = (e) => {
    const oldPin = e.target.value
    this.props.dispatch(changeOldPinValue(oldPin))
  }

  _handleOnChangeNewPin = (e) => {
    const newPin = e.target.value
    this.props.dispatch(changeNewPinValue(newPin))
  }

  render () {
    if(this.props.view){
      return (
        <div>
          <div>
            <div>
              <input type="number" name="oldPin" onChange={this._handleOnChangeOldPin} value={this.props.oldPin} placeholder="Old Pin" />	
            </div>
            <div>
              <input type="number" name="newPin" onChange={this._handleOnChangeNewPin} value={this.props.newPin} placeholder="New Pin" />	
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

  view           : state.changePin.view,
  oldPin         : state.changePin.oldPin,
  newPin         : state.changePin.newPin

}) )(ChangePin)
