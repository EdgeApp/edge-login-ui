import { connect } from 'react-redux'
import { MyModal } from '../../components/common/'
import * as Constants from '../../../common/constants'

export const mapStateToProps = (state, ownProps) => {
  return {
    headerText: 'Save recovery token',
    icon: Constants.MAIL,
    iconType: Constants.ION_ICONS,
    actionLabel: 'Next',
    cancelLabel: 'Cancel',
    hideCancelX: true
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancel: ownProps.cancel,
    action: ownProps.action
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
