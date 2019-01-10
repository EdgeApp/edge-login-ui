// @flow

import { connect } from 'react-redux'

import * as actions from '../../common/actions/'
import * as Constants from '../../common/constants'
import type { Dispatch, State } from '../../types/ReduxTypes'
import ChangePinAppComponent from '../components/ChangePinAppComponent'

export const mapStateToProps = (state: State) => {
  return {
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setWorkflow: () => dispatch(actions.startWorkflow(Constants.WORKFLOW_PIN))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ChangePinAppComponent
)
