// @flow

import { connect } from 'react-redux'
import { sprintf } from 'sprintf-js'

import * as actions from '../../../common/actions'
import { UPDATE_WAIT_TIMER } from '../../../common/constants/index'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { PinKeypad } from '../../components/abSpecific/'

export const mapStateToProps = (state: State) => {
  const pinLength = state.login.pin ? state.login.pin.length : 0
  return {
    pin: state.login.pin,
    username: state.login.username,
    wait: !!(state.login.wait > 0 || pinLength === 4)
  }
}
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChangeText: (data: Object) => dispatch(actions.userLoginWithPin(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PinKeypad)
