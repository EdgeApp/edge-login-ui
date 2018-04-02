// @flow

import { connect } from 'react-redux'

import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
import { EdgeLoginQrStyle } from '../../../native/styles'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { EdgeLoginQrComponent } from '../../components/abSpecific'

export const mapStateToProps = (state: State) => {
  return {
    style: EdgeLoginQrStyle,
    isVisible: state.workflow.currentKey === Constants.WORKFLOW_OTP || false,
    edgeLoginId: state.login.edgeLoginId,
    cancelEdgeLogin: state.login.cancelEdgeLoginRequest
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getQrCode: () => dispatch(actions.getEdgeLoginQrCode()),
    cancelRequest: () =>
      dispatch(actions.dispatchAction(Constants.CANCEL_EDGE_LOGIN_REQUEST))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  EdgeLoginQrComponent
)
