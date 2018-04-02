import { closeLoading, openLoading } from '../../Loader/Loader.action'

/* eslint-disable standard/no-callback-literal */
export const checkPassword = (password, account, callback) => {
  return (dispatch, getState, imports) => {
    // const t = imports.t
    dispatch(openLoading())
    account.checkPassword(password).then(passwordIsGood => {
      dispatch(closeLoading())
      if (!passwordIsGood) {
        return dispatch(callback('Incorrect password'))
      }
      if (passwordIsGood) {
        return dispatch(callback(null))
      }
    })
  }
}
