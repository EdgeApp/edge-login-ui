import { connect } from 'react-redux'
import {MyModal}
  from '../../components/common/'
import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  return {
    headerText: 'EDGE WALLET BETA',
    headerSubtext: 'Warning!',
    middleText: 'This software is currently in beta. Use only small amounts of currency for testing. \n\nDo NOT login to Edge Wallet with your existing Airbitz username and password',
    icon: Constants.EXCLAMATION,
    iconType: Constants.SIMPLE_ICONS,
    actionLabel: 'I Understand',
    cancelLabel: 'Cancel',
    singleButton: true,
    buttonTimerSeconds: 8,
    hideCancelX: true
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancel: () => dispatch(actions.dispatchAction(Constants.WORKFLOW_CANCEL_BETA_MODAL)),
    action: () => dispatch(actions.dispatchAction(Constants.WORKFLOW_CANCEL_BETA_MODAL))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
