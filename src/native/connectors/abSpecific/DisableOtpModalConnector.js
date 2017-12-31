import { connect } from 'react-redux'
import {MyModal}
  from '../../components/common/'
// import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  return {
    headerText: 'Are you sure you want to disable 2FA',
    middleText: '2FA will take 7 days to disable if no action is taken by the account user on authentiacated devices',
    icon: Constants.EXCLAMATION,
    iconType: Constants.SIMPLE_ICONS,
    actionLabel: 'Disable 2FA',
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
