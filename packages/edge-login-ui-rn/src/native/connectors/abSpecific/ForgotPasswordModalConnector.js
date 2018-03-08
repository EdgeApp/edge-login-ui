// @flow

import { connect } from 'react-redux'

import * as Constants from '../../../common/constants'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { MyModal } from '../../components/common/'

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
