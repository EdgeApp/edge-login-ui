import { connect } from 'react-redux'
import type { State, Dispatch } from '../../../types/ReduxTypes'
import { FourDigitInputComponent } from '../../components/abSpecific/'
import * as actions from '../../../common/actions'

export const mapStateToProps = (state: State) => {
  return {
    pin: state.create.pin,
    error: state.create.pinErrorMessage,
    dontForceFocus: true
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
