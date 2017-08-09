import * as Constants from '../constants'
import * as WorkflowActions from './WorkflowActions'

export function logSuccess () {
  return {
    type: Constants.LOGIN_USERNAME_PASSWORD
  }
}

export function loginPIN (data) {
  return {
    type: Constants.LOG_IN_PIN,
    data
  }
}
export function updateUsername (data) {
  return {
    type: Constants.AUTH_UPDATE_USERNAME,
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
    .getText() // setText for later. username
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
        .then(async response => {
          await context.io.folder
            .file('lastuser.json')
            .setText(JSON.stringify({ username: data.username }))
            .catch(e => null)
          console.log('WE GOT THIS')
          dispatch(logSuccess())
          callback(null, response)
        })
        .catch(e => {
          console.log('Big ficking error ')
          console.log(e)
        })
    }, 300)
  }
}

export function validateUsername (data) {
  return (dispatch, getState, imports) => {
    console.log('We are validating..USERNAME so lets do some shit. ' + data)
    dispatch(updateUsername(data))
  }
}
export function validatePassword (data) {
  return (dispatch, getState, imports) => {
    console.log('submit pin. ')
    dispatch(WorkflowActions.nextScreen())
  }
}
export function createUser (data) {
  return (dispatch, getState, imports) => {
    console.log('Create User ')
    dispatch(WorkflowActions.nextScreen())
  }
}

export function skipPassword (data) {
  return (dispatch, getState, imports) => {
    console.log('Skip Password. ')
    dispatch(WorkflowActions.nextScreen())
  }
}
