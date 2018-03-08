// @flow

import { connect } from 'react-redux'

import * as actions from '../../../common/actions/index'
import * as Constants from '../../../common/constants'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { MyModal } from '../../components/common/'

export const mapStateToProps = (state: State) => {
  return {
    headerText: 'Password Changed',
    headerSubtext: 'Password Successfully Changed',
    middleText:
      'DO NOT FORGET YOUR PASSWORD OR RECOVERY ANSWERS! THEY CANNOT BE RECOVERED!',
    icon: Constants.EXCLAMATION,
    iconType: Constants.SIMPLE_ICONS,
    actionLabel: 'OK',
    cancelLabel: 'Cancel',
    singleButton: true
  }
}
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    cancel: () => {
      dispatch(actions.dispatchAction(Constants.CLOSE_NOTIFICATION_MODAL))
      dispatch(actions.cancel())
    },
    action: () => {
      dispatch(actions.dispatchAction(Constants.CLOSE_NOTIFICATION_MODAL))
      dispatch(actions.cancel())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
