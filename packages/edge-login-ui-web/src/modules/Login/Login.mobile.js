import React from 'react'

import LoginEdge from './LoginEdge/LoginEdge.js'
import LoginWithPassword from './LoginWithPassword/LoginWithPassword.js'
import LoginWithPin from './LoginWithPin/LoginWithPin.js'
import NewAccount from './NewAccount/NewAccount.js'

export default ({ password, pin, mobileLogin, history }) => {
  if (!password && !pin) {
    return <NewAccount history={history} />
  }
  if (!pin && password) {
    if (mobileLogin) {
      return <LoginEdge history={history} />
    }
    if (!mobileLogin) {
      return <LoginWithPassword history={history} />
    }
  }
  if (pin && !password) {
    return <LoginWithPin history={history} />
  }
}
