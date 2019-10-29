// @flow

import React, { Component } from 'react'

import Container from './components/Container'
import Account from './connectors/Account.connector'
import Login from './connectors/Login.connector'
import Signup from './connectors/Signup.connector'

export type RouterComponentProps = {
  defaultPage: string
}
export type RouterComponentState = {
  page: string
}

export default class RouterComponent extends Component<
  RouterComponentProps,
  RouterComponentState
> {
  constructor(props: RouterComponentProps) {
    super(props)
    this.state = {
      page:
        props.defaultPage ||
        (/account/.test(window.location) ? '/account' : '/login')
    }
  }

  containerize(Component: Function) {
    return (
      <Container location={{ pathname: this.state.page }}>
        <Component history={{ push: page => this.setState({ page }) }} />
      </Container>
    )
  }

  render() {
    switch (this.state.page) {
      case '/login':
        return this.containerize(Login)
      case '/signup':
        return this.containerize(Signup)
      case '/account':
        return this.containerize(Account)
    }
  }
}
