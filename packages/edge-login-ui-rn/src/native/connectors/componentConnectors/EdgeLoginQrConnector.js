// @flow

import { connect } from 'react-redux'

import { getEdgeLoginQrCode } from '../../../common/actions/LoginAction.js'
import * as Constants from '../../../common/constants'
import { EdgeLoginQrStyle } from '../../../native/styles'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes'
import { EdgeLoginQrComponent } from '../../components/abSpecific/EdgeLoginQrComponent.js'

export const mapStateToProps = (state: RootState) => {
  return {
    style: EdgeLoginQrStyle,
    isVisible: state.workflow.currentKey === Constants.WORKFLOW_OTP || false,
    edgeLoginId: state.login.edgeLoginId,
    cancelEdgeLogin: state.login.cancelEdgeLoginRequest
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getQrCode: () => dispatch(getEdgeLoginQrCode()),
    cancelRequest: () => dispatch({ type: 'CANCEL_EDGE_LOGIN_REQUEST' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EdgeLoginQrComponent)
