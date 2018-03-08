// @flow

import { connect } from 'react-redux'
import { FourDigitInputComponent } from '../../components/abSpecific/'
import type { State, Dispatch } from '../../../types/ReduxTypes'
import * as actions from '../../../common/actions'

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
