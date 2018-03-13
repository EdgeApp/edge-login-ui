import { connect } from 'react-redux'

import * as actions from '../../../../common/actions'
import LinkedComponent from '../../../components/screens/existingAccout/ChangeAccountPinScreenComponent'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    pin: state.create.pin,
    pinError: state.create.pinError,
    workflow: state.workflow,
    showHeader: ownProps.showHeader,
    showModal: state.create.showModal
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePin: data => dispatch(actions.changePIN(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
