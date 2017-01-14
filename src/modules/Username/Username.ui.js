import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeUsernameValue } from './Username.action'

class UsernameComponent extends Component {

  handleSubmit = () => {
    this.props.dispatch(checkUsername(this.props.username))
  }


  // handleBack = () => {
  //   if (this.props.loader.loading === false) {
  //     this.props.dispatch(fadeWhiteOverlay())
  //     Actions.pop()
  //   }
  // }

  // componentWillMount = () => {
  //   Actions.refresh({onLeft: this.handleBack})
  // }

  _handleOnChangeText = (e) => {
    this.props.dispatch(
      changeUsernameValue(e.target.value)
    )
  }

  render () {
    return (
      <div>
        <button type="button">Back</button>
        <input type="text" name="username" onChange={this._handleOnChangeText} value={this.props.username} />
        <button type="button" onClick="_handleSubmit">Next</button>
      </div>
    )
  }
}

export default connect(state => ({

  username: state.username

}))(UsernameComponent)
