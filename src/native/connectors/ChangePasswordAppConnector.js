import { connect } from 'react-redux'
import ChangePasswordAppComponent from '../components/ChangePasswordAppComponent'
import * as actions from '../../common/actions/'
import * as Constants from '../../common/constants'

export const mapStateToProps = (state, ownProps) => {
  return {
    accountObject: ownProps.accountObject,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setWorkflow: () => dispatch(actions.startWorkflow(Constants.WORKFLOW_PASSWORD))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordAppComponent)
