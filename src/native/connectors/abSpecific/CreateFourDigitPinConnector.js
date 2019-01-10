import { connect } from 'react-redux'

import * as actions from '../../../common/actions'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { FourDigitInputComponent } from '../../components/abSpecific/'

export const mapStateToProps = (state: State) => {
  return {
    pin: state.create.pin,
    error: state.create.pinErrorMessage,
    dontForceFocus: true,
    wait: 0
  }
}
export const mapDispatchToProps = (dispatch: Dispatch, ownProps) => {
  return {
    onChangeText: data => dispatch(actions.validatePin(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FourDigitInputComponent
)
