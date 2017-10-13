import React from 'react'
import LoginEdge from './LoginEdge/LoginEdge.mobile.js'
import LoginWithPassword from './LoginWithPassword/LoginWithPassword.js'
import NewAccount from './NewAccount/NewAccount.mobile.js'
import LoginWithPin from './LoginWithPin/LoginWithPin.mobile.js'

export default ({
  password,
  pin,
  mobileLogin,
  history
}) => {
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
