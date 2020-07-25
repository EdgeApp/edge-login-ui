// @flow

import { connect } from 'react-redux'

import { userLoginWithPin } from '../../../common/actions/LoginAction.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes'
import { PinKeypad } from '../../components/abSpecific/PinKeypad.js'

export const mapStateToProps = (state: RootState) => {
  const pinLength = state.login.pin ? state.login.pin.length : 0
  return {
    pin: state.login.pin,
    username: state.login.username,
    wait: !!(state.login.wait > 0 || pinLength === 4)
  }
}
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChangeText: (data: Object) => dispatch(userLoginWithPin(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PinKeypad)
