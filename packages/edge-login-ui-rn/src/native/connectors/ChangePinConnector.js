// @flow

import { connect } from 'react-redux'

import * as Constants from '../../common/constants'
import { type Dispatch, type RootState } from '../../types/ReduxTypes'
import ChangePinAppComponent from '../components/ChangePinAppComponent'

export const mapStateToProps = (state: RootState) => {
  return {
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setWorkflow: () =>
      dispatch({ type: 'WORKFLOW_START', data: Constants.WORKFLOW_PIN })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePinAppComponent)
