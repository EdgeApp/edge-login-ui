import { combineReducers } from 'redux'

import { username } from '../modules/Username/Username.reducer'
import { pin, pinDummy } from '../modules/PinNumber/PinNumber.reducer'
import * as PasswordStates from '../modules/Password/Password.reducer'
import * as PasswordValidation from '../modules/Password/PasswordValidation/PasswordValidation.reducer'
import { nextButtonVisible } from '../modules/NextButton/NextButton.reducer'
import { skipButtonVisible } from '../modules/SkipButton/SkipButton.reducer'
import { disclaimerAccepted } from '../modules/Disclaimer/Disclaimer.reducer'
import * as ReviewDetailsStates from '../modules/ReviewDetails/ReviewDetails.reducer'
import * as Loader from '../modules/Loader/Loader.reducer'
import * as WarningModal from '../modules/WarningModal/WarningModal.reducer'
import * as ErrorModal from '../modules/ErrorModal/ErrorModal.reducer'
import * as Login from '../modules/Login/Login.reducer'
import * as CachedUsers from '../modules/CachedUsers/CachedUsers.reducer'
import * as ChangePassword from '../modules/ChangePassword/ChangePassword.reducer'
import * as ChangePin from '../modules/ChangePin/ChangePin.reducer'
import * as PasswordRecovery from '../modules/PasswordRecovery/PasswordRecovery.reducer'
import * as ForgotPassword from '../modules/ForgotPassword/ForgotPassword.reducer'
import { signupPage } from '../modules/Signup/Signup.reducer'
import { user } from '../modules/User/User.reducer'
import { whiteOverlayVisible, lostFocus, gainedFocus } from '../modules/Landing.reducer'


// import routes from './routesReducer'
// import { alert } from '../modules/Alert/Alert.reducer'

const store = combineReducers({
  signupPage,
  username,
  pin,
  pinDummy,
  password: combineReducers({
    inputState: PasswordStates.inputState,
    password: PasswordStates.password,
    passwordRepeat: PasswordStates.passwordRepeat,
    notification: PasswordStates.notification,
    validation: combineReducers({
      passwordValid: PasswordValidation.passwordValid,
      upperCaseChar: PasswordValidation.upperCaseChar,
      lowerCaseChar: PasswordValidation.lowerCaseChar,
      number: PasswordValidation.number,
      characterLength: PasswordValidation.characterLength
    })
  }),
  reviewDetails: combineReducers({
    details: ReviewDetailsStates.details,
    view: ReviewDetailsStates.view,
    afterQuestionPasswordRecoveryView: ReviewDetailsStates.afterQuestionPasswordRecoveryView
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
    loginNotification: Login.loginNotification

  }),
  nextButtonVisible,
  skipButtonVisible,

  loader: combineReducers({
    loading: Loader.loading,
    message: Loader.message
    // style: Loader.style
  }),
  warningModal: combineReducers({
    visible: WarningModal.visible,
    module: WarningModal.module,
    title: WarningModal.title,
    message: WarningModal.message
  }),
  errorModal: combineReducers({
    visible: ErrorModal.visible,
    message: ErrorModal.message
  }),
  cachedUsers: combineReducers({
    users: CachedUsers.users,
    selectedUserToLogin: CachedUsers.selectedUserToLogin,
    userToDeleteFromUserCache: CachedUsers.userToDeleteFromUserCache
  }),
  landing: combineReducers({
    disclaimerAccepted,
    whiteOverlayVisible,
    lostFocus,
    gainedFocus
  }),
  changePassword: combineReducers({
    view: ChangePassword.view,
    revealPassword: ChangePassword.revealPassword,
    oldPassword: ChangePassword.oldPassword,
    newPassword: ChangePassword.newPassword,
    newPasswordRepeat: ChangePassword.newPasswordRepeat,
    passwordChangedNotification: ChangePassword.passwordChangedNotification
  }),
  changePin: combineReducers({
    view: ChangePin.view,
    password: ChangePin.password,
    pin: ChangePin.pin,
    pinChangedNotification: ChangePin.pinChangedNotification
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
    email: PasswordRecovery.email
  }),
  forgotPasswordModal: ForgotPassword.visible,
  user
  // routes,
  // alert: alert
})

export default store
