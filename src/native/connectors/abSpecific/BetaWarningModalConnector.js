import { connect } from 'react-redux'
import {MyModal}
  from '../../components/common/'
import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  return {
    headerText: 'EDGE WALLET BETA',
    middleText: 'The software is currently in beta. it is recommended to use small amounts of currency to play with and test. Do Not use as your primary wallet until production release',
    icon: Constants.EXCLAMATION,
    iconType: Constants.SIMPLE_ICONS,
    actionLabel: 'I Understand',
    cancelLabel: 'Cancel',
    singleButton: true,
    buttonTimerSeconds: 1,
    modalDismissTimerSeconds: 10,
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
