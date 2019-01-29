import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { closeLoading } from '../Loader/Loader.action'
import { edgeLogin } from './Login.middleware'
import Mobile from './Login.mobile.js'
import Desktop from './Login.web.js'

class Login extends Component {
  constructor (props) {
    super(props)

    props.dispatch(
      edgeLogin((error, account) => {
        if (!error) {
          if (window.abcui.loginCallback) {
            return window.abcui.loginCallback(null, account)
          }
          props.dispatch(closeLoading())
          return props.history.push('/account')
        }
      })
    )
  }
  componentWillUnmount () {
    if (this.props.edgeObject) {
      return this.props.edgeObject.cancelRequest()
    }
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            pin={this.props.pin}
            password={this.props.password}
            mobileLogin={this.props.mobileLogin}
            history={this.props.history}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            pin={this.props.pin}
            password={this.props.password}
            mobileLogin={this.props.mobileLogin}
            history={this.props.history}
          />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  pin: state.login.viewPIN,
  password: state.login.viewPassword,
  mobileLogin: state.login.mobileLoginView,
  edgeObject: state.login.edgeLoginResults
}))(Login)
