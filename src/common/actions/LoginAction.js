import * as Constants from '../constants'

export function loginPIN (data) {
  return {
    type: Constants.LOG_IN_PIN,
    data
  }
}

export function previousUsersReturned (data) {
  return {
    type: Constants.SET_PREVIOUS_USERS,
    data
  }
}
export function getPreviousUsers (context) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    context
      .listUsernames()
      .then(response => {
        dispatch(previousUsersReturned(response))
      })
      .catch(e => {
        console.log('Getting Previous  ')
        console.log(e)
      })
  }
}

export function userLogin (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    let callback = imports.callback
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    setTimeout(() => {
      context
        .loginWithPassword(data.username, data.password, null, null)
        .then(response => {
          callback(null, response)
        })
        .catch(e => {
          console.log('Big ficking error ')
          console.log(e)
        })
    }, 300)
  }
}
