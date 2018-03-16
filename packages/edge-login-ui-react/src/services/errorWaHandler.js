import { showContainerNotification } from '../modules/Container.action'

export default function (error, dispatch) {
  let syntax
  switch (error.name) {
    case 'NetworkError':
      syntax =
        'There was a network error with your request. Please try again later.'
      break
    case 'ObsoleteApiError':
      syntax =
        'The API you are using appears to be obsolete. Please consider upgrading your app version.'
      break
    case 'UsernameError':
      syntax =
        'There was an error with the username you specified. Please try again later.'
      break
    case 'PasswordError':
      syntax =
        'There was an error with your password. Please make sure that your password meets the requirements and try again.'
      break
    default:
      syntax =
        'There was an unexpected error with your request. Please try again later.'
  }

  dispatch(showContainerNotification(syntax, 'error'))
}
