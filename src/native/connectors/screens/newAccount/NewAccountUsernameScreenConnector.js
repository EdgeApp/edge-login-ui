import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountUsernameScreenComponent'
import * as loginAction from '../../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    validateUsername: (data) => dispatch(loginAction.validateUsername(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
