import { connect } from 'react-redux'
import { FourDigitInputComponent } from '../../components/abSpecific/'
import * as actions from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    style: ownProps.style,
    pin: state.create.pin,
    error: state.create.pinErrorMessage,
    dontForceFocus: true
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: data => dispatch(actions.validatePin(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FourDigitInputComponent
)
