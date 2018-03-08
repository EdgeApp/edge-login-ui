// @flow

import { connect } from 'react-redux'
import { MyModal } from '../../components/common/'
import type { State, Dispatch } from '../../../types/ReduxTypes'
import * as Constants from '../../../common/constants'

type OwnProps = {
  cancel(): void,
  action(): void
}
export const mapStateToProps = (state: State) => {
  return {
    headerText: 'Password Recovery',
    icon: Constants.TRASH_O,
    iconType: Constants.FONT_AWESOME,
    actionLabel: 'Next',
    cancelLabel: 'Cancel',
    hideCancelX: true
  }
}
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    cancel: ownProps.cancel,
    action: ownProps.action
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
