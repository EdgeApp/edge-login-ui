import { connect } from 'react-redux'
import ChangePinAppComponent from '../components/ChangePinAppComponent'
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
    setWorkflow: () => dispatch(actions.startWorkflow(Constants.WORKFLOW_PIN))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePinAppComponent)
