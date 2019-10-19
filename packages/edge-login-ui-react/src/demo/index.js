// @flow

import 'edge-login-ui-react/lib/styles.css'

import type { EdgeAccount, EdgeContext } from 'edge-core-js'
import { makeEdgeContext } from 'edge-core-js'
import { AccountScreen, LoginScreen } from 'edge-login-ui-react'
import React, { Component } from 'react'
import { render } from 'react-dom'

const vendorName = 'Edge React Demo'
const vendorImageUrl =
  'data:image/png;base64,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'

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
