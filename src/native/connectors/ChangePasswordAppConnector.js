// @flow

import { connect } from 'react-redux'

import * as actions from '../../common/actions/'
import * as Constants from '../../common/constants'
import type { Dispatch, State } from '../../types/ReduxTypes'
import ChangePasswordAppComponent from '../components/ChangePasswordAppComponent'
import type { OwnProps } from '../components/ChangePasswordAppComponent'

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  return {
    workflow: state.workflow,
    showHeader: ownProps.showHeader
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setWorkflow: () =>
      dispatch(actions.startWorkflow(Constants.WORKFLOW_PASSWORD))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ChangePasswordAppComponent
)
