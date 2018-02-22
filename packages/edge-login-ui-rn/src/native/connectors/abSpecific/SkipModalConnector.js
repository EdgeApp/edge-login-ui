// @flow
import { connect } from 'react-redux'
import { MyModal } from '../../components/common/'
import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
import type { State, Dispatch } from '../../../types/ReduxTypes'

export const mapStateToProps = (state: State) => {
  return {
    headerText: 'Are you sure you want to skip?',
    middleText:
      'Without a password, you will not be able to login on a new device if this device is lost or stolen, or if this app is uninstalled.',
    icon: Constants.EXCLAMATION,
    iconType: Constants.SIMPLE_ICONS,
    actionLabel: 'SKIP',
    cancelLabel: 'Cancel'
  }
}
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    cancel: () => dispatch(actions.cancelSkipStep()),
    action: () => dispatch(actions.nextScreen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
