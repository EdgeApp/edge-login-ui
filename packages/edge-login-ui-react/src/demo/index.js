// @flow

import 'edge-login-ui-react/lib/styles.css'

import type { EdgeAccount, EdgeContext } from 'edge-core-js'
import { makeEdgeContext } from 'edge-core-js'
import { AccountScreen, LoginScreen } from 'edge-login-ui-react'
import React, { Component } from 'react'
import { render } from 'react-dom'

const vendorName = 'Edge React Demo'
const vendorImageUrl =
  'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png'

type RootProps = {}
type RootState = {
  account: EdgeAccount | null,
  closed: boolean,
  context: EdgeContext | null
}

class Root extends Component<RootProps, RootState> {
  constructor (props) {
    super(props)
    makeEdgeContext({
      apiKey: '3ad0717b3eb31f745aba7bd9d51e7fd1b2926431',
      appId: 'com.mydomain.myapp'
    }).then(context => this.setState({ context }))

    this.state = {
      account: null,
      closed: false,
      context: null
    }
  }

  logout = () => {
    if (this.state.account) this.state.account.logout()
    this.setState({ account: null })
  }
  onClose = () => this.setState({ closed: true })
  onError = () => {}
  onLogin = account => this.setState({ account })
  onOpen = () => this.setState({ closed: false })

  render () {
    if (!this.state.context) {
      return <p>Loading...</p>
    }
    if (this.state.account) {
      if (this.state.closed) {
        return (
          <p>
            Currently logged in.
            <br />
            <button onClick={this.onOpen}>Show Account UI</button>
            <br />
            <button onClick={this.logout}>Logout</button>
          </p>
        )
      }
      return (
        <AccountScreen
          context={this.state.context}
          account={this.state.account}
          onClose={this.onClose}
          onError={this.onError}
          vendorName={vendorName}
          vendorImageUrl={vendorImageUrl}
        />
      )
    }

    if (this.state.closed) {
      return (
        <p>
          Currently logged out.
          <br />
          <button onClick={this.onOpen}>Show Login UI</button>
        </p>
      )
    }
    return (
      <LoginScreen
        accountOptions={{}}
        context={this.state.context}
        onClose={this.onClose}
        onError={this.onError}
        onLogin={this.onLogin}
        vendorName={vendorName}
        vendorImageUrl={vendorImageUrl}
      />
    )
  }
}

const root = document.getElementById('app')
if (root) render(<Root />, root)
