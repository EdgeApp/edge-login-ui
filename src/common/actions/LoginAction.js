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

async function getDiskStuff (context) {
  const userList = await context.listUsernames().then(usernames =>
    Promise.all(
      usernames.map(username => {
        return context
          .pinLoginEnabled(username)
          .then(pinEnabled => ({ username, pinEnabled }))
      })
    )
  )

  const lastUser = await context.io.folder
    .file('lastuser.json')
    .getText() // setText for later.
    .then(text => JSON.parse(text))
    .then(json => json.username)
    .catch(e => null)

  return { lastUser, userList }
}

export function getPreviousUsers (context) {
  return (dispatch, getState, imports) => {
    let context = imports.context

    getDiskStuff(context).then(bob => {
      dispatch(previousUsersReturned(bob))
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
