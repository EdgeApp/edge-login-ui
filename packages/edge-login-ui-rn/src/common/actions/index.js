export * from './LoginAction'
export * from './CreateAccountActions'
export * from './PreviousUsersActions'
export * from './WorkflowActions'
export * from './UserActions'
export * from './ChangePasswordPinActions'
export * from './PasswordRecoveryActions'

export function dispatchAction (type) {
  return {
    type
  }
}

export function dispatchActionWithData (type, data) {
  return {
    type,
    data
  }
}
