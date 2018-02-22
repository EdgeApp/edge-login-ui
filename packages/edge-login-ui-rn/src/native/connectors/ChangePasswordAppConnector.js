// @flow
import { connect } from 'react-redux'
import type { Dispatch, State } from '../../types/ReduxTypes'
import ChangePasswordAppComponent from '../components/ChangePasswordAppComponent'
import type { OwnProps } from '../components/ChangePasswordAppComponent'

import * as actions from '../../common/actions/'
import * as Constants from '../../common/constants'

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
