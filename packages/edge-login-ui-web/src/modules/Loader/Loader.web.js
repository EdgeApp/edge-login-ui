import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'react-toolbox/lib/dialog'
import ProgressBar from 'react-toolbox/lib/progress_bar'

class Loader extends Component {
  _checkLoading = () => {
    if (
      this.props.loader.loading === true &&
      this.props.errorModal.visible === false
    ) {
      return true
    } else {
      return false
    }
  }

  handleToggle = () => {
    // this.props.dispatch(hideLoading())
  }

  actions = [{ label: 'Ok', onClick: this.handleToggle }]

  _renderMessage = () => {
    if (this.props.loader.message) {
      return (
        <div>
          <p>
            <b>{this.props.loader.message}</b>
          </p>
          <br />
        </div>
      )
    } else {
      return null
    }
  }

  render () {
    if (this._checkLoading()) {
      return (
        <Dialog
          style={{ zIndex: 2 }}
          action={this.actions}
          active={this._checkLoading()}
        >
          <div
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {this._renderMessage()}
            <ProgressBar type="circular" mode="indeterminate" multicolor />
          </div>
        </Dialog>
      )
    }
    if (!this._checkLoading()) return null
  }
}

export default connect(state => ({
  loader: state.loader,
  errorModal: state.errorModal
}))(Loader)
