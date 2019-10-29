// import-sort-ignore
import { combineReducers } from 'redux'

// Account Management
import { accountPage } from './Account.reducer'
import changePassword from './AccountChangePassword.reducer'
import changePin from './AccountChangePin.reducer'
import passwordRecovery from './AccountPasswordRecovery.reducer'
import passwordRecoveryToken from './AccountPasswordRecoveryToken.reducer'
import cachedUsers from './CachedUsers.reducer'
// Others
import loader from './Loader.reducer'
// Login
import login from './Login.reducer'
import { accountCacheDelete } from './ModalAccountCacheDelete.reducer'
import { accountCreated } from './ModalAccountCreated.reducer'
import accountPasswordCheck from './ModalAccountPasswordCheck.reducer'
// Modals
import { forgotPassword } from './ModalForgotPassword.reducer'
import { passwordRecoverySuccess } from './ModalPasswordRecoverySuccess.reducer'
import notification from './Notification.reducer'
// Signup
import { signupPage } from './Signup.reducer'
import password from './SignupPassword.reducer'
import pin from './SignupPinNumber.reducer'
import reviewDetails from './SignupReviewDetails.reducer'
import username from './SignupUsername.reducer'
import { user } from './User.reducer'

const store = combineReducers({
  // Login
  login,
  cachedUsers,

  // Signup
  signupPage,
  username,
  pin,
  password,
  reviewDetails,

  // Account Management
  accountPage,
  changePin,
  changePassword,
  passwordRecovery,
  passwordRecoveryToken,

  // Modals
  modal: combineReducers({
    forgotPassword,
    accountPasswordCheck,
    passwordRecoverySuccess,
    accountCreated,
    accountCacheDelete
  }),

  // Others
  loader,
  notification,
  user
})

export default store
