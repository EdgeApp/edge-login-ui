import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountWelcomeScreenComponent'
import * as actions from '../../../../common/actions/'
import * as Constants from '../../../../common/constants'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    nextScreen: () => dispatch(actions.nextScreen()),
    createUser: data => dispatch(actions.createUser(data)),
    exitScreen: () => dispatch(actions.startWorkflow(Constants.WORKFLOW_INIT))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
