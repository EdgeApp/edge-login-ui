// import-sort-ignore
import { combineReducers } from 'redux'

// Login
import login from './Login.reducer'
import cachedUsers from './CachedUsers.reducer'

// Signup
import { signupPage } from './Signup.reducer'
import username from './SignupUsername.reducer'
import pin from './SignupPinNumber.reducer'
import password from './SignupPassword.reducer'
import reviewDetails from './SignupReviewDetails.reducer'

// Account Management
import { accountPage } from './Account.reducer'
import changePin from './AccountChangePin.reducer'
import changePassword from './AccountChangePassword.reducer'
import passwordRecovery from './AccountPasswordRecovery.reducer'
import passwordRecoveryToken from './AccountPasswordRecoveryToken.reducer'

// Modals
import { forgotPassword } from './ModalForgotPassword.reducer'
import { accountCacheDelete } from './ModalAccountCacheDelete.reducer'
import { accountCreated } from './ModalAccountCreated.reducer'
import accountPasswordCheck from './ModalAccountPasswordCheck.reducer'
import { passwordRecoverySuccess } from './ModalPasswordRecoverySuccess.reducer'

// Others
import loader from './Loader.reducer'
import notification from './Notification.reducer'
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
