import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountWalletCreationScreenComponent'
import * as loginAction from '../../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    auth: state.login,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitPin: (data) => dispatch(loginAction.submitPin(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
