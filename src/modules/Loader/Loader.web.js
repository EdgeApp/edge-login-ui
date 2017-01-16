import React, { Component } from 'react'
import { connect } from 'react-redux'

class Loader extends Component {

  _checkLoading = () => {
    if (this.props.loader.loading === true && this.props.errorModal.visible === false) {
      return true
    } else {
      return false
    }
  }

  render () {
    if(this._checkLoading()){
      return (
        <div>
          <h5>Loader</h5>
          <p>{this.props.loader.message}</p>   
        </div>
      )
    }
    if(!this._checkLoading()) return null
  }
}

export default connect(state => ({

  loader: state.loader,
  errorModal: state.errorModal

}))(Loader)
