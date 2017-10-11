import React from 'react'
import LoginEdge from './Components/LoginEdge.mobile.js'
import LoginWithPassword from './Components/LoginWithPassword.js'
import NewAccount from './Components/NewAccount.mobile.js'
import LoginWithPin from './Components/LoginWithPin.mobile.js'

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
