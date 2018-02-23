// @flow
import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountWelcomeScreenComponent'
import * as actions from '../../../../common/actions/'
import * as Constants from '../../../../common/constants'
import type { State, Dispatch } from '../../../../types/ReduxTypes'

export const mapStateToProps = (state: State) => {
  return {
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    nextScreen: () => dispatch(actions.nextScreen()),
    createUser: (data: Object) => dispatch(actions.createUser(data)),
    exitScreen: () => dispatch(actions.startWorkflow(Constants.WORKFLOW_INIT))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
