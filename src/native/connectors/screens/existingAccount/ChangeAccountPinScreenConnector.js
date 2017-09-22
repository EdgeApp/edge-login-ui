import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/existingAccout/ChangeAccountPinScreenComponent'
import * as actions from '../../../../common/actions'
// import * as Constants from '../../../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    pin: state.create.pin,
    pinError: state.create.pinError,
    workflow: state.workflow,
    showHeader: ownProps.showHeader
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePin: (data) => dispatch(actions.changePIN(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
