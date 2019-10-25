import React, { Component } from 'react'

import LoginEdge from '../connectors/LoginEdge.connector'
import NewAccount from '../connectors/LoginNewAccount.connector'
import LoginWithPassword from '../connectors/LoginWithPassword.connector'
import LoginWithPin from '../connectors/LoginWithPin.connector'
import styles from '../styles/Login.scss'

export default class Login extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    if (this.props.edgeObject) {
      return this.props.edgeObject.cancelRequest()
    }
  }

  render() {
    const { edge, password, pin, history } = this.props
    if (!edge && !password && !pin) {
      return (
        <section>
          <div className={styles.webContainer}>
            <NewAccount history={history} />
          </div>
        </section>
      )
    }
    if (edge && !pin) {
      return (
        <section>
          <div className={styles.webContainer}>
            <LoginEdge history={history} />
          </div>
        </section>
      )
    }
    if (password && !pin) {
      return (
        <section>
          <div className={styles.webContainer}>
            <LoginWithPassword history={history} />
          </div>
        </section>
      )
    }
    if (!edge && !password && pin) {
      return (
        <section>
          <div className={styles.webContainer}>
            <LoginWithPin history={history} />
          </div>
        </section>
      )
    }
  }
}
