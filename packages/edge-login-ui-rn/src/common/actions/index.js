// @flow

export * from './LoginAction'
export * from './CreateAccountActions'
export * from './PreviousUsersActions'
export * from './WorkflowActions'
export * from './UserActions'
export * from './ChangePasswordPinActions'
export * from './PasswordRecoveryActions'

export function dispatchAction (type: string) {
  return {
    type
  }
}

export function dispatchActionWithData (type: string, data: Object) {
  return {
    type,
    data
  }
}

export function dispatchActionWitString (type: string, data: string) {
  return {
    type,
    data
  }
}
