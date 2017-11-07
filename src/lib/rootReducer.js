import { combineReducers } from 'redux'

// Signup
import { signupPage } from '../modules/Signup/Signup.reducer'
import * as Username from '../modules/Signup/Username/Username.reducer'
import * as PinNumber from '../modules/Signup/PinNumber/PinNumber.reducer'
import * as PasswordStates from '../modules/Signup/Password/Password.reducer'
import * as PasswordValidation from '../modules/Signup/Password/PasswordValidation/PasswordValidation.reducer'
import * as ReviewDetailsStates from '../modules/Signup/ReviewDetails/ReviewDetails.reducer'

// Login
import * as Login from '../modules/Login/Login.reducer'
import { mobileShowQRCode } from '../modules/Login/LoginEdge/LoginEdge.mobileState.js'
import * as CachedUsers from '../modules/Login/CachedUsers/CachedUsers.reducer'
import { user } from '../modules/User/User.reducer'

// Account Management
import * as ChangePassword from '../modules/AccountManagement/ChangePassword/ChangePassword.reducer'
import * as ChangePin from '../modules/AccountManagement/ChangePin/ChangePin.reducer'
import * as PasswordRecovery from '../modules/AccountManagement/PasswordRecovery/PasswordRecovery.reducer'
import passwordRecoveryToken from '../modules/AccountManagement/PasswordRecoveryToken/PasswordRecoveryToken.reducer.js'

// Modals
import * as AccountManagementPassword from '../modules/Modals/AccountManagementPassword/AccountManagementPassword.reducer.js'
import { forgotPassword } from '../modules/Modals/ForgotPassword/ForgotPassword.reducer.js'
import { accountCreated } from '../modules/Modals/AccountCreated/AccountCreated.reducer.js'
import { passwordRecoverySuccess } from '../modules/Modals/PasswordRecoverySucess/PasswordRecoverySuccess.reducer.js'
import { accountCacheDelete } from '../modules/Modals/AccountCacheDelete/AccountCacheDelete.reducer.js'
import { success } from '../modules/Modals/Success/Success.reducer.js'

import * as Loader from '../modules/Loader/Loader.reducer'

const store = combineReducers({
  signupPage,
  username: combineReducers({
    username: Username.username,
    error: Username.error
  }),
  pin: combineReducers({
    pin: PinNumber.pin,
    error: PinNumber.error
  }),
  password: combineReducers({
    inputState: PasswordStates.inputState,
    password: PasswordStates.password,
    passwordRepeat: PasswordStates.passwordRepeat,
    notification: PasswordStates.notification,
    error: combineReducers({
      password: PasswordStates.errorPassword,
      passwordRepeat: PasswordStates.errorPasswordRepeat
    }),
    validation: combineReducers({
      passwordValid: PasswordValidation.passwordValid,
      upperCaseChar: PasswordValidation.upperCaseChar,
      lowerCaseChar: PasswordValidation.lowerCaseChar,
      number: PasswordValidation.number,
      characterLength: PasswordValidation.characterLength,
      timeToCrackPassword: PasswordValidation.timeToCrackPassword
    })
  }),
  reviewDetails: combineReducers({
    details: ReviewDetailsStates.details,
    view: ReviewDetailsStates.view
  }),
  login: combineReducers({
    viewPassword: Login.viewPassword,
    viewPIN: Login.viewPIN,
    username: Login.username,
    password: Login.password,
    pin: Login.pin,
    pinDummy: Login.pinDummy,
    showCachedUsers: Login.showCachedUsers,
    edgeLoginResults: Login.edgeLoginResults,
    edgeUsername: Login.edgeUsername,
    edgeAccount: Login.edgeAccount,
    loginPinWait: Login.loginPinWait,
    loginPasswordWait: Login.loginPasswordWait,
    loginNotification: Login.loginNotification,
    error: Login.error,
    errorPin: Login.errorPin,
    mobileLoginView: Login.mobileLoginView,
    mobileShowQRCode
  }),
  loader: combineReducers({
    loading: Loader.loading,
    message: Loader.message
    // style: Loader.style
  }),
  cachedUsers: combineReducers({
    users: CachedUsers.users,
    selectedUserToLogin: CachedUsers.selectedUserToLogin,
    userToDeleteFromUserCache: CachedUsers.userToDeleteFromUserCache,
    usersWithPinEnabled: CachedUsers.usersWithPinEnabled
  }),
  changePassword: combineReducers({
    view: ChangePassword.view,
    revealPassword: ChangePassword.revealPassword,
    oldPassword: ChangePassword.oldPassword,
    newPassword: ChangePassword.newPassword,
    newPasswordRepeat: ChangePassword.newPasswordRepeat,
    passwordChangedNotification: ChangePassword.passwordChangedNotification,
    errorPassword: ChangePassword.errorPassword,
    errorPasswordRepeat: ChangePassword.errorPasswordRepeat
  }),
  changePin: combineReducers({
    view: ChangePin.view,
    password: ChangePin.password,
    pin: ChangePin.pin,
    pinChangedNotification: ChangePin.pinChangedNotification,
    error: ChangePin.error
  }),
  passwordRecovery: combineReducers({
    view: PasswordRecovery.view,
    viewToken: PasswordRecovery.viewToken,
    viewFinishModal: PasswordRecovery.viewFinishModal,
    finishButton: PasswordRecovery.finishButton,
    questions: PasswordRecovery.questions,
    firstQuestion: PasswordRecovery.firstQuestion,
    firstAnswer: PasswordRecovery.firstAnswer,
    secondQuestion: PasswordRecovery.secondQuestion,
    secondAnswer: PasswordRecovery.secondAnswer,
    password: PasswordRecovery.password,
    token: PasswordRecovery.token,
    email: PasswordRecovery.email,
    error: combineReducers({
      firstQuestion: PasswordRecovery.errorFirstQuestion,
      secondQuestion: PasswordRecovery.errorSecondQuestion,
      firstAnswer: PasswordRecovery.errorFirstAnswer,
      secondAnswer: PasswordRecovery.errorSecondAnswer
    })
  }),
  passwordRecoveryToken,
  modal: combineReducers({
    forgotPassword,
    accountManagementPassword: combineReducers({
      password: AccountManagementPassword.password,
      view: AccountManagementPassword.view,
      route: AccountManagementPassword.route,
      error: AccountManagementPassword.error
    }),
    passwordRecoverySuccess,
    accountCreated,
    accountCacheDelete,
    success
  }),
  user
  // routes,
})

export default store
