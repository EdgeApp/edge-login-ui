import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountPasswordScreenComponent'
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
    validatePassword: (data) => dispatch(loginAction.validatePassword(data)),
    skipPassword: (data) => dispatch(loginAction.skipPassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
