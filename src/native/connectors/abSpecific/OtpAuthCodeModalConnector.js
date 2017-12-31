import { connect } from 'react-redux'
import {MyModal}
  from '../../components/common/'
// import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  return {
    headerText: 'Enter Authentication Code',
    // middleText: 'Sign into your account using the device you setup 2FA with, and go to Settings > 2 Factor Authentication to find the code.',
    modalMiddleComponent: ownProps.middle,
    icon: Constants.EXCLAMATION,
    iconType: Constants.SIMPLE_ICONS,
    actionLabel: 'Done',
    cancelLabel: 'Cancel',
    hideCancelX: true
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancel: () => ownProps.cancel(),
    action: () => ownProps.action()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
