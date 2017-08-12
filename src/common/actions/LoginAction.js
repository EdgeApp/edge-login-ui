import * as Constants from '../constants'
import * as WorkflowActions from './WorkflowActions'
import { isASCII } from '../util'

export function createAccountSuccess (data) {
  return {
    type: Constants.CREATE_ACCOUNT_SUCCESS,
    data
  }
}
export function createAccountFail (data) {
  return {
    type: Constants.CREATE_ACCOUNT_FAIL,
    data
  }
}
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
export function updatePassword (data) {
  return {
    type: Constants.AUTH_UPDATE_PASSWORD,
    data
  }
}
export function updateConfirmPassword (data) {
  return {
    type: Constants.AUTH_UPDATE_CONFIRM_PASSWORD,
    data
  }
}

export function previousUsersReturned (data) {
  return {
    type: Constants.SET_PREVIOUS_USERS,
    data
  }
}

export function testAction () {
  console.log('this is a todo stubb.. dont use ')
  return {
    type: 'DO NOTHING '
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

export function userLoginWithPin (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    let callback = imports.callback
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    setTimeout(() => {
      context
        .loginWithPIN(data.username, data.pin, null, null)
        .then(async response => {
          await context.io.folder
            .file('lastuser.json')
            .setText(JSON.stringify({ username: data.username }))
            .catch(e => null)
          dispatch(logSuccess())
          callback(null, response)
        })
        .catch(e => {
          console.log('Big ficking error PIN ')
          console.log(e)
        })
    }, 300)
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
// validateUsername check
export function validateUsername (data) {
  return (dispatch, getState, imports) => {
    // TODO evaluate client side evaluations.
    let error = data.length > 3
      ? null
      : 'Username must be longer than 3 characters ' // TODO: Localize string
    error = isASCII(data) ? error : 'Username must only be ascii characthers ' // TODO: localize
    const obj = {
      username: data,
      error: error
    }
    dispatch(updateUsername(obj))
  }
}

export function checkUsernameForAvailabilty (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    setTimeout(() => {
      context
        .usernameAvailable(data)
        .then(async response => {
          if (response) {
            const obj = {
              username: data,
              error: null
            }
            dispatch(updateUsername(obj))
            dispatch(WorkflowActions.nextScreen())
            return
          }
          const obj = {
            username: data,
            error: 'THE USERNAME ALREADY EXOSTS ' // TODO - localize string.
          }
          dispatch(updateUsername(obj))
        })
        .catch(e => {
          console.log('Big ficking error ')
          console.log(e.message)
          console.log(e)
        })
    }, 300)
  }
}
export function validateConfirmPassword (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    let error = null
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    const passwordEval = context.checkPasswordRules(data)
    if (!passwordEval.passed) {
      error = 'YOU HAVE NOT MET MINIMUM PASSWORD REQUIREMENTS' // TODO localize.
    }
    var obj = {
      password: data,
      passwordStatus: passwordEval,
      error: error
    }
    dispatch(updateConfirmPassword(obj))
  }
}
export function validatePassword (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    let error = null
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    const passwordEval = context.checkPasswordRules(data)
    if (!passwordEval.passed) {
      error = 'YOU HAVE NOT MET MINIMUM PASSWORD REQUIREMENTS' // TODO localize.
    }
    var obj = {
      password: data,
      passwordStatus: passwordEval,
      error: error
    }
    dispatch(updatePassword(obj))
  }
}
export function pin (data) {
  return (dispatch, getState, imports) => {
    let error = null
    if (data.length !== 4) {
      error = 'PIN MUST BE 4 Digits' // TODO localize
    }
    var obj = {
      password: data,
      error: error
    }
    console.log(obj)
    // dispatch(updatePin(obj))
  }
}
export function createUser (data) {
  return (dispatch, getState, imports) => {
    let context = imports.context
    dispatch(WorkflowActions.nextScreen())
    setTimeout(() => {
      context
        .createAccount(data.username, data.password, data.pin, null, null)
        .then(async response => {
          console.log('response create user ')
          dispatch(createAccountSuccess(response))
        })
        .catch(e => {
          console.log('Big ficking error createUser')
          console.log(e)
          dispatch(createAccountFail(e.message))
        })
    }, 300)
  }
}

export function agreeToConditions (account) {
  return (dispatch, getState, imports) => {
    console.log('Skip Password. ')
    // dispatch(WorkflowActions.nextScreen())
  }
}

export function skipPassword (data) {
  return (dispatch, getState, imports) => {
    console.log('Skip Password. ')
    let callback = imports.callback
    callback(data)
    // dispatch(WorkflowActions.nextScreen())
  }
}
