// @flow

import { connect } from 'react-redux'
import { sprintf } from 'sprintf-js'

import * as actions from '../../../common/actions'
import { UPDATE_WAIT_TIMER } from '../../../common/constants/index'
import s from '../../../common/locales/strings.js'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { FourDigitInputComponent } from '../../components/abSpecific/'

export const mapStateToProps = (state: State) => {
  const wait = state.login.wait
  const error =
    wait < 1
      ? state.login.errorMessage
      : state.login.errorMessage +
        ': ' +
        sprintf(s.strings.account_locked_for, wait)
  return {
    pin: state.login.pin,
    username: state.login.username,
    error,
    autoLogIn: true,
    isLogginginWithPin: state.login.isLoggingInWithPin,
    wait
  }
}
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChangeText: (data: Object) => dispatch(actions.userLoginWithPin(data)),
    updateWaitTime: (seconds: number) =>
      dispatch(actions.dispatchActionWithData(UPDATE_WAIT_TIMER, { seconds }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FourDigitInputComponent
)
