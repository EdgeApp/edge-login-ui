import { connect } from 'react-redux'
import {MyModal}
from '../../components/common/'
import * as Constants from '../../../common/constants'

export const mapStateToProps = (state, ownProps) => {
  return {
    headerText: 'Password Recovery',
    icon: Constants.TRASH_O,
    iconType: Constants.FONT_AWESOME,
    actionLabel: 'Next',
    hideCancelX: false,
    singleButton: true
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancel: ownProps.cancel,
    action: ownProps.action
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
