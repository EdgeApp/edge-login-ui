// @flow

import { connect } from 'react-redux'

import { cancel } from '../../../common/actions/WorkflowActions.js'
import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes'
import { MyModal } from '../../components/common/'

export const mapStateToProps = (state: RootState) => {
  return {
    headerText: s.strings.pin_changed,
    headerSubtext: s.strings.pin_successfully_changed,
    middleText: '',
    icon: Constants.EXCLAMATION,
    iconType: Constants.SIMPLE_ICONS,
    actionLabel: s.strings.ok,
    cancelLabel: s.strings.cancel,
    singleButton: true
  }
}
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    cancel: () => {
      dispatch({ type: 'CLOSE_NOTIFICATION_MODAL' })
      dispatch(cancel())
    },
    action: () => {
      dispatch({ type: 'CLOSE_NOTIFICATION_MODAL' })
      dispatch(cancel())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)
