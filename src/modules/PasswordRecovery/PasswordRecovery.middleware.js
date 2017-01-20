import { passwordRecoveryDone, hidePasswordRecoveryView } from './PasswordRecovery.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
// import { signupUser } from '../Signup/Signup.middleware'

export const checkPasswordRecovery = ( payload, callback ) => {

  const checkAnswersLength = (first, second) => first.length < 4 || second.length < 4 ? false : true
  const checkQuestions = (first, second) => first === second ? false : true
  const checkPassword = (password, abcAccount) => true

  return ( dispatch, getState, imports ) => {
    const abcContext = imports.abcContext
    const t = imports.t

    if(!checkAnswersLength(payload.firstAnswer, payload.secondAnswer)){
      return callback('Answers does not met length requirements') 
    }
    if(!checkQuestions(payload.firstQuestion, payload.secondQuestion)){
      return callback('Please select a different question from the first one') 
    }
    if(!checkPassword(payload.password, null)){
      return callback('Password does not match') 
    }
    if(checkAnswersLength && checkQuestions && checkPassword) {
      dispatch(hidePasswordRecoveryView())
      return dispatch(passwordRecoveryDone())
    }
  }
}

