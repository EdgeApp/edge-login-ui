import { connect } from 'react-redux'
import {MyModal}
  from '../../components/common/'
import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  return {
    headerText: 'Are you sure you want to skip?',
    middleText: 'Without a password, you will not be able to login on a new device if this device is lost or stolen, or if this app is uninstalled.',
    icon: Constants.CLOSE_ICON,
    iconType: Constants.MATERIAL_ICONS,
    actionLabel: 'SKIP',
    cancelLabel: 'Cancel'
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancel: () => dispatch(actions.cancelSkipStep()),
    action: () => dispatch(actions.nextScreen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
