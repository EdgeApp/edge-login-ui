import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountUsernameScreenComponent'
import * as loginAction from '../../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    workflow: state.workflow,
    username: state.create.username,
    usernameErrorMessage: state.create.usernameErrorMessage
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkUsernameForAvailabilty: (data) => dispatch(loginAction.checkUsernameForAvailabilty(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
