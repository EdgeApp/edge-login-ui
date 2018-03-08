// @flow

import { connect } from 'react-redux'

import * as actions from '../../../common/actions'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { FourDigitInputComponent } from '../../components/abSpecific/'

export const mapStateToProps = (state: State) => {
  return {
    pin: state.login.pin,
    username: state.login.username,
    error: state.login.errorMessage,
    autoLogIn: true,
    isLogginginWithPin: state.login.isLoggingInWithPin
  }
}
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChangeText: (data: Object) => dispatch(actions.userLoginWithPin(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FourDigitInputComponent
)
